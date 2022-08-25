import { openmrsFetch } from "@openmrs/esm-framework";
import {
  encounterTypeCheckIn,
  habitatConcept,
  maritalStatusConcept,
  occupationConcept,
} from "./constant";





const BASE_WS_API_URL = "/ws/rest/v1/";
export const deathValidatedValue = "a7257403780e198072fd77a4536fe8fd";
export const today = new Date().toISOString().split('T')[0];

export function getVisits(patientUuid, visitDate) {
  return openmrsFetch(`${BASE_WS_API_URL}visit?patient=${patientUuid}&fromStartDate=${visitDate}&v=full&limit=1`)
}

const isCurrentVisit = (visit, today): boolean => {
  return (visit?.startDatetime.split('T')[0] === today) && (visit?.stopDatime === undefined);
}

export async function startVisit(visitType, patientUuid, abortController) {
  return openmrsFetch(`${BASE_WS_API_URL}visit`,
    {
      method: 'POST',
      body: {
        "patient": patientUuid,
        "visitType": visitType
      },
      headers: { 'Content-Type': 'application/json' },
      signal: abortController.signal
    });
}

export async function getCurrentUserRoleSession() {
  let CurrentSession;
  await openmrsFetch(`${BASE_WS_API_URL}session`).then((data) => {
    CurrentSession = data.data.user.systemId.split("-")[0];
  });
  return CurrentSession;
}

async function fetchObsByPatientAndEncounterType(
  patientUuid: string,
  encounterType: string
) {
  if (patientUuid && encounterType) {
    let encounter = await openmrsFetch(
      `${BASE_WS_API_URL}encounter?patient=${patientUuid}&encounterType=${encounterType}&v=default`,
      { method: "GET" }
    );
    let observations = [];
    let concepts =
      encounter.data.results[encounter.data.results?.length - 1]?.obs;
    if (concepts) {
      await Promise.all(
        concepts.map(async (concept) => {
          const obs = await getObs(concept.links[0]?.uri);
          observations.push({
            concept: obs?.data?.concept,
            answer: obs?.data?.value,
          });
        })
      );
    }
    return observations;
  }
  return Promise.resolve(null);
}

function getObs(path: string) {
  return openmrsFetch(
    `${BASE_WS_API_URL + path.split(BASE_WS_API_URL)[1]}?lang=${localStorage.i18nextLng
    }`,
    { method: "GET" }
  );
}

export async function getPatient(query) {
  let patients;
  const searchResult = await openmrsFetch(
    `${BASE_WS_API_URL}patient?v=full&q=${query}&includeDead=true`,
    {
      method: "GET",
    }
  );

  function checkUndefined(value) {
    return value !== null && value !== undefined ? value : "";
  }
  const formatAttribute = (item) =>
    item?.map((identifier) => {
      return {
        type: identifier.display.split(" = ")[0].trim(),
        value: identifier.display.split(" = ")[1].trim(),
      };
    });

  const formatValided = (item) => {
    return item === deathValidatedValue;
  };

  const formatConcept = (concepts, uuid) => {
    let value;
    concepts?.map(
      (concept) =>
        concept?.concept?.uuid == uuid && (value = concept?.answer?.display)
    );
    return value;
  };

  const formatResidence = (address, village, country) => {
    let residenceAddress = checkUndefined(address) !== "" ? address + ", " : "";
    let residenceVillage = checkUndefined(village) !== "" ? village + ", " : "";
    let residenceCountry = checkUndefined(country) !== "" ? country : "";
    return residenceAddress + residenceVillage + residenceCountry;
  };



  if (searchResult) {
    patients = Promise.all(
      searchResult?.data.results?.map(async function (item) {
        const relationships = await openmrsFetch(
          `${BASE_WS_API_URL}relationship?v=full&person=${item?.uuid}`,
          {
            method: "GET",
          }
        );
        const Allconcept = await fetchObsByPatientAndEncounterType(
          item?.uuid,
          encounterTypeCheckIn
        );
        const attributs = formatAttribute(
          relationships?.data?.results?.[0]?.personA?.attributes
        );
        const personAttributes = formatAttribute(item?.person?.attributes);
        const identifiers = formatAttribute(item?.identifiers);
        const visit = await getVisits(item?.uuid, today)


        return {
          id: item?.uuid,

          identify: identifiers?.find(
            (identifier) => identifier.type == "CIN" || identifier.type == "NIF"
          )?.value,

          No_dossier: item?.identifiers?.[0]?.identifier,

          firstName: item?.person?.names?.[0]?.familyName,

          lastName: item?.person?.names?.[0]?.givenName,

          birth: item?.person?.birthdate?.split("T")?.[0],

          residence: formatResidence(
            checkUndefined(item?.person?.addresses?.[0]?.display),
            checkUndefined(item?.person?.addresses?.[0]?.cityVillage),
            checkUndefined(item?.person?.addresses?.[0]?.country)
          ),

          habitat: formatConcept(Allconcept, habitatConcept),

          phoneNumber: personAttributes?.find(
            (attribute) => attribute.type == "Telephone Number"
          )?.value,

          gender: item?.person?.gender,

          birthplace: personAttributes?.find(
            (attribute) => attribute.type == "Birthplace"
          )?.value,

          dead: item?.person?.dead,

          occupation: formatConcept(Allconcept, occupationConcept),

          matrimonial: formatConcept(Allconcept, maritalStatusConcept),

          deathDate: item?.person?.deathDate,

          currentVisit: isCurrentVisit(visit?.data?.results[0],today),

          valided: formatValided(
            identifiers?.find(
              (identifier) => identifier.type == "Death Validated"
            )?.value
          ),

          relationship: [
            relationships?.data?.results?.[0]?.personB?.display,
            relationships?.data?.results?.[0]?.relationshipType?.aIsToB,
            attributs?.map((attribut) =>
              attribut.type == "Telephone Number" ? attribut.value : ""
            ),
          ],
        };
      })
    );
  }
  return patients;
}

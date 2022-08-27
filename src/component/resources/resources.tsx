import { openmrsFetch, getCurrentUser } from '@openmrs/esm-framework';
import { mergeMap } from 'rxjs/operators';
import { uuidPhoneNumber, encounterTypeCheckIn, unknowLocation, countryName, deathValidatedValue } from './constants';
import { Address, Concept, Encounter, Obs, Person } from './types';
export const BASE_WS_API_URL = '/ws/rest/v1/';
export const today = new Date().toISOString().split('T')[0];
export const toDay = () => new Date().toISOString();

export const getConceptAnswer = (concept, setQuestion): Concept[] => {
  setQuestion(concept.display)
  return (concept.answers).map(answer => {
    return ({ uuid: answer.uuid, name: answer.display, display: answer.display })
  })
}

export async function saveAllObs(obs: Obs[], person: string, abortController: AbortController, encounterUuid?: string, format?) {
  const toDay = new Date().toISOString();
  if (format) {
    const concepts: Obs[] = obs.map(o => {
      if (typeof o.answers === 'string') {
        return { question: o.question, answers: o.answers, uuid: o.uuid }
      } else if (typeof o.answers === 'object') {
        return { question: o.question, answers: o.answers['uuid'], uuid: o.uuid }
      }
    });
    obs = concepts;
  }
  const encounter = encounterUuid ? encounterUuid : await (await saveEncounter(encounterUuid ? { encounterDatetime: toDay } : { patient: person, encounterDatetime: toDay, encounterType: encounterTypeCheckIn, location: unknowLocation }, abortController, encounterUuid)).data.uuid;
  if (obs.length > 0) {
    await Promise.all(obs.map(async concept => {
      const obs = await saveObs(person, toDay, encounter, concept.question, concept.answers, abortController, concept?.uuid)
    }))
  }
}


export function generateIdentifier(source: string, abortController: AbortController) {
  return openmrsFetch(`${BASE_WS_API_URL}idgen/identifiersource/${source}/identifier`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: {
      generateIdentifiers: true,
      sourceUuid: source,
      numberToGenerate: 1
    },
    signal: abortController.signal,
  });
}

export async function saveEncounter(encounter: Encounter | any, abortController: AbortController, uuid?: string) {
  return openmrsFetch(`${BASE_WS_API_URL}encounter/${uuid ? uuid : ""}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: encounter,
    signal: abortController.signal,
  });
}

export async function getEncounterByPatientAndEncounterType(patient: string, encounterType: string) {
  return openmrsFetch(`${BASE_WS_API_URL}encounter?patient=${patient}&encounterType=${encounterType}&v=default`, { method: 'GET' });
}

export async function getEncounterByPatientAndEncounterTypeAndStartDate(patient: string, encounterType: string, date: Date) {
  return openmrsFetch(`${BASE_WS_API_URL}encounter?patient=${patient}&encounterType=${encounterType}&fromdate=${date.toISOString()}&v=default`, { method: 'GET' });
}

export async function saveObs(person: string, obsDatetime: string, encounter: string, concept: string, value: string | any, abortController: AbortController, uuid?: string) {
  if (uuid)
    return editObs(uuid, value, abortController);
  return openmrsFetch(`${BASE_WS_API_URL}obs`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: {
      person: person,
      obsDatetime: obsDatetime,
      encounter: encounter,
      location: unknowLocation,
      concept: concept,
      value: value,
    },
    signal: abortController.signal,
  });
}
function editObs(uuid: string, value: string, abortController: AbortController) {
  return openmrsFetch(`${BASE_WS_API_URL}obs/${uuid}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { value: value },
    signal: abortController.signal,
  });
}

function deleteObs(uuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}obs/${uuid}?purge=true`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
}


export async function fetchAllLocation() {
  const url = `/module/addresshierarchy/ajax/getChildAddressHierarchyEntries.form?searchString=${countryName}`;
  try {
    const statesData = await openmrsFetch(url, { method: 'GET' });
    let states = await statesData
    const cityVillages = async (state) => (openmrsFetch(`${url}%7C${state}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }));
    let places: Address[] = [];
    let placesTables;
    let locs: Address[] = [];
    placesTables = await Promise.all(
      states.data.map(async state => {
        let cities = await cityVillages(state.name)
        locs = await Promise.all(cities.data.map((city) => ({ country: countryName, stateProvince: state.name, cityVillage: city.name, display: `${city.name}, ${state.name}` })))
        return locs;
      })
    )
    await Promise.all(placesTables.map(async (tables) => tables.map(t => places.push(t))))
    return places
  } catch (error) { }
}

export async function fetchConceptByUuid(conceptUuid: string, lang: string) {
  return openmrsFetch(`${BASE_WS_API_URL}concept/${conceptUuid}?v=full&lang=${lang}`, {
    method: "GET",
  });
}

export function getSynchronizedCurrentUser(opts: any) {
  return getCurrentUser(opts).pipe(
    mergeMap(async user => {
      return user;
    }),
  );
}

export function formAddres(address): Address {
  if (address) {
    if (typeof address === "string")
      return { country: countryName, stateProvince: address.split(", ")[1], cityVillage: address.split(", ")[0], address1: "", display: address }
    else
      return { country: address.country, stateProvince: address.stateProvince, cityVillage: address.cityVillage, address1: address.address1, display: address.cityVillage + " ," + address.stateProvince }
  }
  else {
    return null;
  }
}


export async function fetchPerson(uri: string, query?: string) {
  const url = `${BASE_WS_API_URL}person${uri ? uri : '?q=' + query}`
  return openmrsFetch(url, { method: 'GET' });
}

export function savePerson(abortController: AbortController, person: Person, uuid?: string) {
  if (uuid) {
    EditPersonName(abortController, person, uuid);
  }
  return openmrsFetch(`${BASE_WS_API_URL}person/${uuid ? uuid : ''}`, {
    method: 'POST',
    body: person,
    headers: { 'Content-Type': 'application/json' },
    signal: abortController.signal
  });
}


export function EditPersonName(abortController: AbortController, person: Person, uuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}person/${uuid}/name`, {
    method: 'POST',
    body: {
      "givenName": person.names[0].givenName,
      "familyName": person.names[0].familyName,
      "preferred": true
    },
    headers: { 'Content-Type': 'application/json' },
    signal: abortController.signal
  });
}

export function deletePerson(abortController: AbortController, uuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}person/${uuid}?purge=true`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    signal: abortController.signal
  });
}

export function getObs(path: string) {
  return openmrsFetch(
    `${BASE_WS_API_URL + path.split(BASE_WS_API_URL)[1]}?lang=${localStorage.i18nextLng
    }`,
    { method: "GET" }
  );
}
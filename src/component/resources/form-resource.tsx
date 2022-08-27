import { FetchResponse, openmrsFetch, openmrsObservableFetch, Visit } from '@openmrs/esm-framework';
import { async, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
const BASE_WS_API_URL = '/ws/rest/v1/';
export const today = new Date().toISOString().split('T')[0];

export const isCurrentVisit = (visit, today): boolean => {
  return ((visit?.startDatetime.split('T')[0] === today) && (visit?.stopDatime === undefined)) ? visit.uuid : undefined
}

export function getVisitsByPatientBetweenVisiDate(patientUuid, visitDate) {
  return openmrsFetch(`${BASE_WS_API_URL}visit?patient=${patientUuid}&fromStartDate=${visitDate}&v=full&limit=1`)
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

export function getVisitByUuid(
  visitUuid: string,
): Observable<FetchResponse<Visit>> {
  

  return openmrsObservableFetch(
      `${BASE_WS_API_URL}visit/${visitUuid}?v=full`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
    .pipe(take(1))
    .pipe(
      map((response: FetchResponse<Visit>) => {
        return response;
      })
    );
}

export async function getCurrentUserRoleSession() {
  let CurrentSession;
  await openmrsFetch(`${BASE_WS_API_URL}session`).then((data) => {
    CurrentSession = data.data.user.systemId.split("-")[0];
  });
  return CurrentSession;
}



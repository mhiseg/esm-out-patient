import { FetchResponse, openmrsFetch, openmrsObservableFetch, Visit } from '@openmrs/esm-framework';
import { async, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
const BASE_WS_API_URL = '/ws/rest/v1/';
export const today = new Date().toISOString().split('T')[0];
export const options = {
  "light": false,
  "color": { "scale": { "F-respiratoire": "#FB000F", "F-cardiaque": "#14FF00", "Temp": "#FEA903", "TA Systole": "#F700FC", "TA Diastole": "#07066F" } },
  "axes": {
      "bottom": { "mapsTo": "date", "scaleType": "time" },
      "left": { "mapsTo": "value", "scaleType": "linear" }
  },
  "height": "200px",
  "toolbar": { "enabled": false }
}
export const isCurrentVisit = (visit, today): boolean => {
  return ((visit?.startDatetime.split('T')[0] === today) && (visit?.stopDatetime === null)) ? visit.uuid : undefined
}
export const getFieldById = (id: string, form) => form.fields.find(field => field.id === id)

export function getVisitsByPatientBetweenVisiDate(patientUuid, visitDate) {
  return openmrsFetch(`${BASE_WS_API_URL}visit?patient=${patientUuid}&fromStartDate=${visitDate}&v=full&limit=1`)
}

export async function saveVisit(visit, abortController: AbortController, uuid?: string) {
  return openmrsFetch(`${BASE_WS_API_URL}visit/${uuid ? uuid : ""}`,
    {
      method: 'POST',
      body: visit,
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

export const getDateWithMonthOlder = (date: Date, months: number): Date =>{
  date.setMonth(date.getMonth() - months)
  return date;
}

export async function getCurrentUserRoleSession() {
  let CurrentSession;
  await openmrsFetch(`${BASE_WS_API_URL}session`).then((data) => {
    CurrentSession = data.data.user.systemId.split("-")[0];
  });
  return CurrentSession;
}



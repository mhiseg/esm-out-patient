import { Visit, getStartedVisit, getVisitsForPatient, VisitMode, VisitStatus } from "@openmrs/esm-framework";
import { useState, useEffect, useReducer } from "react";
import { dispatch } from "rxjs/internal/observable/pairs";
import { encounterVitalSign } from "./constants";
import { getDateWithMonthOlder, getVisitByUuid } from "./form-resource";
import { formatPatientForCard, getPatientByUuid } from "./patient-resources";
import { getEncounterByPatientAndEncounterType, getEncounterByPatientAndEncounterTypeAndStartDate, getEncountersByPatientAndEncounterTypeAndLimit, toDay, today } from "./resources";
export type NullableVisit = Visit | null;
// export type NullablePatient =  | null;


interface CurrentVisitState {
  visitUuid: string | null;
  visit: any;
  isPendingUuid: boolean;
  isLoadingVisit: boolean;
  err: Error | null;
}
interface LoadVisit {
  type: ActionTypes.loadVisit;
  visitUuid: string | null;
}

interface NewVisit {
  type: ActionTypes.newVisit;
  visit: any;
}

interface VisitLoadError {
  type: ActionTypes.loadError;
  err: Error | null;
}
type Action = LoadVisit | NewVisit | VisitLoadError;
enum ActionTypes {
  loadVisit = "loadVisit",
  newVisit = "newVisit",
  loadError = "visitLoadError",
}

const initialState: CurrentVisitState = {
  visitUuid: null,
  visit: null,
  isPendingUuid: true,
  isLoadingVisit: false,
  err: null,
};

function reducer(
  state: CurrentVisitState,
  action: Action
): CurrentVisitState {
  switch (action.type) {
    case ActionTypes.loadVisit:
      return {
        ...state,
        visitUuid: action.visitUuid,
        visit: null,
        isPendingUuid: false,
        isLoadingVisit: true,
        err: null,
      };
    case ActionTypes.newVisit:
      return {
        ...state,
        visit: action.visit,
        isPendingUuid: false,
        isLoadingVisit: false,
        err: null,
      };
    case ActionTypes.loadError:
      return {
        ...state,
        visit: null,
        isPendingUuid: false,
        isLoadingVisit: false,
        err: action.err,
      };
    default:
      return state;
  }
}

function getVisitUuidFromUrl(): string | null {
  const match = /\/vital-signs\/([a-zA-Z0-9\-]+)\/?/.exec(location.pathname);
  return match && match[1];
}

export function useVisit(visitUuid: string) {
  const [currentVisit, setCurrentVisit] = useState<Visit | null>(null);
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    visitUuid: visitUuid ?? null,
    isPendingUuid: !visitUuid,
    isLoadingVisit: !!visitUuid,
  }
  );

  useEffect(() => {
    if (state.isPendingUuid) {
      const visitUuidFromUrl = getVisitUuidFromUrl();
      if (visitUuidFromUrl) {
        dispatch({
          type: ActionTypes.loadVisit,
          visitUuid: visitUuidFromUrl,
        });
      } else {
        dispatch({ type: ActionTypes.newVisit, visit: null });
      }
    }

    let active = true;
    if (state.isLoadingVisit && state.visitUuid) {
      getVisitByUuid(visitUuid).subscribe(
        async ({ data }) => {
          const encounters = await getEncounterByPatientAndEncounterTypeAndStartDate(data.patient.uuid, encounterVitalSign,  getDateWithMonthOlder(new Date(),6) );
          // const encounters = await getEncountersByPatientAndEncounterTypeAndLimit(data.patient.uuid, encounterVitalSign, 10 );
          const patient = await getPatientByUuid(data.patient.uuid);
          active &&
            dispatch({
              visit: {...data, encounters: encounters.data.results, patient:  await formatPatientForCard(patient?.data)},
              type: ActionTypes.newVisit,
            })
        },
        (err) =>
          active &&
          dispatch({
            err,
            type: ActionTypes.loadError,
          })
      );

    }
    return () => {
      active = false;
    };
  }, [state.isPendingUuid, state.isLoadingVisit, state.visitUuid]);

  useEffect(() => {
    const handleRouteUpdate = (evt) => {
      const newVisitUuid = getVisitUuidFromUrl();
      if (newVisitUuid != state.visitUuid) {
        dispatch({
          type: ActionTypes.loadVisit,
          visitUuid: newVisitUuid,
        });
      }
    };
    window.addEventListener("single-spa:routing-event", handleRouteUpdate);
    return () =>
      window.removeEventListener("single-spa:routing-event", handleRouteUpdate);
  }, [state.visitUuid]);


  return {
    isLoading: state.isPendingUuid || state.isLoadingVisit,
    visit: state.visit,
    patientUuid: visitUuid ?? state.visitUuid,
    error: state.err,
  };
}



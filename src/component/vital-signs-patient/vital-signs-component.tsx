import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useVisit } from "../resources/useVisit";
import { VitalSignsForm } from "./vital-signs-form";


const VitalSignsComponent: React.FC = () => {
  const { t } = useTranslation();
  const param: {
    visitUuid?: string
  } = useParams();
  const { isLoading: isLoadingVisit, visit: visitData, } = useVisit(param?.visitUuid);
  const to: NavigateOptions = { to: window.spaBase + "/out-patient/search" };

  const toSearchPatient = (data) => {
    if (data === undefined || data === null)
      navigate(to);
  }

  const getFormVisit = () => {
    toSearchPatient(visitData)
    return <>
      <h4 className={'title-page'}>{t("Vitalsigns")}</h4>
      <div className={'mhiseg-main-content'}>
        <VitalSignsForm />
      </div>
    </>
  }
  return <> {isLoadingVisit === false && getFormVisit()} </>
}
export default VitalSignsComponent;

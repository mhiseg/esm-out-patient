import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useVisit } from "../resources/useVisit";
import { VitalSignsForm } from "./vital-signs-form";
import styles from "./vital-signs.scss";


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

  const getFormVisit = (vist) => {
    toSearchPatient(visitData)
    return <>
      <h4 className={'title-page'}>{t("Vitalsigns")}</h4>
      <div className={styles.main}>
        <VitalSignsForm visit={vist} />
      </div>
    </>
  }
  return <> {isLoadingVisit === false && getFormVisit(visitData)} </>
}
export default VitalSignsComponent;

import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import React, {  } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { usePatientDashboard } from "../../resources/usePatientDashborad";
import styles from "../../search-patient/searchPatient/searchPatient.scss";

const PatientDashboard = () => {
    const param: {
        patientUuid?: string
    } = useParams();
    const { t } = useTranslation();
    const { isLoading: isLoadingPatientSearch, patient: patientSearch } = usePatientDashboard(param?.patientUuid);
    const to: NavigateOptions = { to: window.spaBase + "/out-patient/search" };

    const toSearchPatient = (patient) => {
        if (patient === undefined)
            navigate(to);
    }

    const getFormPatientDashboard = () => {
        toSearchPatient(isLoadingPatientSearch)
        return <>
            <h4 className={`title-page`}>{t('dashboardPatient')}</h4>
            <div className={styles.main}>
               
            </div>
        </>
    }
    return <> {isLoadingPatientSearch === false && getFormPatientDashboard()} </>
};
export default PatientDashboard;
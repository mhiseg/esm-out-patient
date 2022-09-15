import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import React, {  } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { usePatientDashboard } from "../../resources/usePatientDashborad";
import DashboardContent from "./dashboard-content";
import styles from "./dashboard.scss";


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

    const getPatientDashboard = () => {
        toSearchPatient(isLoadingPatientSearch)
        return <>
            <h4 className={styles.titlePage}>{t('dashboardPatient')}</h4>
            <div className={styles.main}>
               <DashboardContent patient={patientSearch}/>
            </div>
        </>
    }
    return <> {isLoadingPatientSearch === false && getPatientDashboard()} </>
};
export default PatientDashboard;
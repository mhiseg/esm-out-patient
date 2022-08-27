/**
 * From here, the application is pretty typical React, but with lots of
 * support from `@openmrs/esm-framework`. Check out `Greeter` to see
 * usage of the configuration system, and check out `PatientGetter` to
 * see data fetching using the OpenMRS FHIR API.
 *
 * Check out the Config docs:
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config
 */

import React from "react";
import { useTranslation } from "react-i18next";
import { VitalSignsForm } from "./vital-signs-form";
import styles from "./vital-signs.scss";


const VitalSignsComponent: React.FC = () => {
  const { t } = useTranslation();


  return (
    <>
      <h4 className={'title-page'}>{t("Vitalsigns")}</h4>
      <div className={styles.main}>
        <VitalSignsForm />
      </div>
    </>
  );
};

export default VitalSignsComponent;
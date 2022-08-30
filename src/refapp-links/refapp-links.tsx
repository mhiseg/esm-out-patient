import React, { useEffect, useState } from "react";
import { ConfigurableLink, getCurrentUser } from "@openmrs/esm-framework";
import { useTranslation } from "react-i18next";

export default function OutPatient() {
  const { t } = useTranslation();
    return(
      <ConfigurableLink to="${openmrsBase}/spa/out-patient/search">{t("outPatient")}</ConfigurableLink>
    );
}

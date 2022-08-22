import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import { Button, Tile } from "carbon-components-react";
import React from "react";
import { useTranslation } from "react-i18next";
import EmptyDataIllustration from "../toobar_search_container/empty-data-illustration.component";
import styles from "../toobar_search_container/toolbar_search_container.scss";

export const PatientCardNotFound = function () {
  const { t } = useTranslation();
  const toNewPatient: NavigateOptions = {
    to: window.spaBase + "/outpatient/patient",
  };
  return (
    <>
      <p className={styles.resultsText}>
        {t("noResultsFound", "No results found")}
      </p>
      <Tile className={styles.emptySearchResultsTile}>
        <EmptyDataIllustration />
        <p className={styles.emptyResultText}>
          {t(
            "noPatientChartsFoundMessage",
            "Sorry, no patient charts have been found"
          )}
        </p>
        <p className={styles.actionText}>
          <span>
            {t(
              "trySearchWithPatientUniqueID",
              "Try searching with the patient's unique ID number"
            )}
          </span>
          <br />
          <span>{t("orPatientName", "OR the patient's name(s)")}</span>
        </p>
        <Button
          className={styles.ButtonAdd}
          kind="primary"
          type="submit"
          size="sm"
          isSelected={true}
          onClick={() => {
            navigate(toNewPatient);
          }}
        >
          {t("New patient")}
        </Button>
      </Tile>
    </>
  );
};

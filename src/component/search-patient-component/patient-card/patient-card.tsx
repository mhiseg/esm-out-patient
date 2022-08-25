import React, { useEffect, useState } from "react";
import {
  Button,
  Column,
  Grid,
  OverflowMenu,
  OverflowMenuItem,
  Row,
  Tile,
} from "carbon-components-react";
import { Icon } from "@iconify/react";
import styles from "./patient-card.scss";
import FormatCardCell from "./patient-cardCell";
import RelationShipCard from "../relationShipCard/relationShiphCard";
import { navigate, NavigateOptions, showToast } from "@openmrs/esm-framework";
import { useTranslation } from "react-i18next";
import { facilityVisit } from "../constant";
import { startVisit } from "../patient-getter.resource";

const PatientCard = ({ patient, userRole}) => {
  const [activeVisit,setActiveVisit] = useState(patient?.currentVisit);
  const { t } = useTranslation();
  const toEditPatient: NavigateOptions = {
    to: window.spaBase + "/out-patient/patient/" + patient.id,
  };
  const editPatient = (e) => {
    navigate(toEditPatient);
  };

  function formatPhoneNumber(phoneNumberString) {
    return ("(+509) " + phoneNumberString?.replace(/\D/g, "").match(/.{1,4}/g)?.join("-").substr(0, 9) || "");
  }

  const newVisit = () => {
    startVisit(facilityVisit, patient.id, AbortController).then(async () => {
      showToast({
        title: t('successfullyAdded', 'Dossier declasseé avec succes'),
        kind: 'success',
        description: 'Dossier declassé avec success',
      });
      setActiveVisit(true);
    })
      .catch(error => {
        showToast({ description: error.message })
      });
  }




  const containerClass = () => {
    switch (activeVisit) {
        case false:
            return `${styles.cardBox}`
        case true:
            return `${styles.cardBoxActiveVisit}`
        default:
            return '';
    }
}

  

  return (
    <Tile className={containerClass()} light={true}>
      <Grid className={styles.pm0} fullWidth={true}>
        <Row className={styles.pm0}>
          <Column className={styles.pm0}>
            <Grid className={styles.pm0} fullWidth={true}>
              <Column className={styles.paddingH} lg={12}>
                <Row className={styles.borderBottom}>
                  <Column className={styles.pm0} lg={6}>
                    <h1 className={styles.name}>
                      {patient.gender == "F" ? (
                        <Icon
                          icon="emojione-monotone:woman"
                          className={styles.iconHead}
                        />
                      ) : null}
                      {patient.gender == "M" ? (
                        <Icon
                          icon="emojione-monotone:man"
                          className={styles.iconHead}
                        />
                      ) : null}
                      {patient.firstName + ","} {patient.lastName}
                    </h1>
                  </Column>
                  <Column className={styles.pm0} lg={6}>
                    <h3 className={`${styles.noDossierStyle} ${styles.name}`}>
                      <Icon
                        icon="fluent:folder-open-20-regular"
                        className={styles.iconFolder}
                      />
                      {patient.No_dossier}
                    </h3>
                    {patient.valided === false && (
                      <>
                      
                        <OverflowMenu
                          flipped
                          className={styles.overFlowMenuStyle}
                          size="lg"
                        >
                          <OverflowMenuItem
                            itemText={t("editPatient")}
                            onClick={editPatient}
                          />
                          {userRole !== "nurse" && (
                            <OverflowMenuItem
                              itemText={t("visitLabel", "Declasser dossier")}
                              onClick={() => { newVisit();
                               }}
                            />
                          )}
                        </OverflowMenu>
                      </>
                    )}
                  </Column>
                </Row>
              </Column>
              <Row>
                <Column lg={4}>
                  <FormatCardCell
                    icon="cil:calendar"
                    label={patient.birth}
                  />

                  <FormatCardCell
                    icon="ion:home-outline"
                    label={patient.residence}
                  />
                  <FormatCardCell
                    icon="healthicons:city-outline"
                    label={patient.habitat}
                  />
                </Column>

                <Column lg={3}>
                  <FormatCardCell
                    icon="teenyicons:id-outline"
                    label={patient.identify}
                  />

                  <FormatCardCell
                    icon="carbon:user-multiple"
                    label={patient.matrimonial}
                  />

                  <FormatCardCell
                    icon="ic:baseline-work-outline"
                    label={patient.occupation}
                  />
                </Column>

                <Column lg={5}>
                  <FormatCardCell
                    icon="carbon:phone"
                    label={formatPhoneNumber(patient.phoneNumber)}
                  />
                  <FormatCardCell
                    icon="bytesize:location"
                    label={patient.birthplace}
                  />
                  <FormatCardCell
                    icon="akar-icons:link-chain"
                    label={
                      patient.relationship[0] != "" &&
                        patient.relationship[0] != null ? (
                        <RelationShipCard
                          relationshipName={patient.relationship[0]}
                          relationshipType={patient.relationship[1]}
                          relationshipPhone={formatPhoneNumber(patient.relationship[2].toString())}
                        />
                      ) : null
                    }
                  />
                </Column>
              </Row>
            </Grid>
          </Column>
        </Row>
      </Grid>
    </Tile>
  );
};
export default PatientCard;

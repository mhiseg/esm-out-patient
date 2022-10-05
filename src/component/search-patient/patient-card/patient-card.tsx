import React, { useState } from "react";
import {
  Column,
  Grid,
  OverflowMenu,
  OverflowMenuItem,
  Row,
  Tile,
} from "carbon-components-react";
import { Icon } from "@iconify/react";
import styles from "./patient-card.scss";
import { navigate, NavigateOptions, showToast } from "@openmrs/esm-framework";
import { useTranslation } from "react-i18next";
import { Profiles } from "../../resources/types";
import { saveVisit } from "../../resources/form-resource";
import { facilityVisitType } from "../../resources/constants";
import CardBody from "./patient-card-body";

const PatientCard = ({ patient, userRole }) => {
  const [activeVisit, setActiveVisit] = useState(patient?.currentVisit);
  const { t } = useTranslation();
  const toEditPatient: NavigateOptions = { to: window.spaBase + "/out-patient/patient/" + patient.id };
  const toAddSignVital: NavigateOptions = { to: window.spaBase + "/out-patient/vital-signs/" + activeVisit };
  const editPatient = (e) => { navigate(toEditPatient) };

  
  const newVisit = () => {
    saveVisit({ visitType: facilityVisitType, patient: patient.id }, new AbortController()).then(async (v) => {
      showToast({
        title: t('successfullyAdded', 'Dossier declasseé avec succes'),
        kind: 'success',
        description: 'Dossier declassé avec success',
      });
      setActiveVisit(v.data.uuid);
    })
      .catch(error => {
        showToast({ description: error.message })
      });
  }

  const containerClass = () => {
    if (activeVisit)
      return `${styles.cardBoxActiveVisit}`
    else
      return `${styles.cardBox}`
  }
  return (userRole !== undefined ?
    <Tile className={containerClass()} light={true} onClick={(e) => { userRole !== Profiles.ARCHIVIST && activeVisit ? navigate(toAddSignVital) : "" }} >
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
                          {(userRole === Profiles.ARCHIVIST || userRole === Profiles.ADMIN) && patient.currentVisit === undefined && !patient.dead && (
                            <OverflowMenuItem
                              itemText={t("visitLabel", "Declasser dossier")}
                              onClick={() => {
                                newVisit();
                              }}
                            />
                          )}
                          {(userRole !== Profiles.ARCHIVIST && patient.currentVisit) && (
                            <OverflowMenuItem
                              itemText={t("addSignsVital", "addSignsVital")}
                              onClick={() => {
                                navigate(toAddSignVital);
                              }}
                            />
                          )}
                        </OverflowMenu>
                      </>
                    )}
                  </Column>
                </Row>
              </Column>
              <CardBody patient={patient}/>
            </Grid>
          </Column>
        </Row>
      </Grid>
    </Tile> :
    <Tile className={styles.cardBox} light={true}  >
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
                  </Column>
                </Row>
              </Column>
              <CardBody patient={patient}/>
            </Grid>
          </Column>
        </Row>
      </Grid>
    </Tile>
  );
};
export default PatientCard;

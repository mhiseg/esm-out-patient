import React, { Profiler, useEffect, useState } from "react";
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
import styles from "./dash-card.scss";
import { useTranslation } from "react-i18next";
import CardBody from "../../../search-patient/patient-card/patient-card-body";

const DashCard = ({ patient }) => {
    const { t } = useTranslation();
    // const [activeVisit, setActiveVisit] = useState(patient?.currentVisit);
    // const labelClass = () => {
    //     if (activeVisit)
    //         return `${}`
    //     else
    //         return `${}`
    // }
    //const toEditPatient: NavigateOptions = { to: window.spaBase + "/out-patient/patient/" + patient.id };
    //const editPatient = (e) => { navigate(toEditPatient) };


    return (
        <Tile className={styles.cardProps} light={true}>
            <Grid className={styles.pm0} fullWidth={true}>
                <Column className={styles.pm0}>
                    <Row className={styles.pm0}>
                        <Column sm={1} md={1} lg={1} className={styles.photo}>
                            <Icon className={styles.photoIcon} icon="tabler:photo-off" width={30} height={30} />
                        </Column>
                        <Column sm={11} md={11} lg={11} className={styles.pm0}>
                            <Column className={styles.paddingHr} lg={12}>
                                <Row className={styles.borderBottom}>
                                    <Column className={styles.pm0} lg={6}>
                                        <p className={styles.name}>
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
                                            {patient?.currentVisit ? <label className={styles.cardBoxActiveVisit} >{t("activeVisitLabel", "Active")}</label> : <label className={styles.cardBox} >{t("inactiveVisitLabel", "Inactive")}</label>}
                                        </p>
                                        <p className={styles.dossier}><span>No dossier:</span>{patient.No_dossier} </p>

                                    </Column>

                                    <Column >
                                        <Button kind="tertiary" size="sm" isSelected={true} className={styles.ConsultationButton}>
                                            <span>
                                                <Icon
                                                    icon="ant-design:plus-circle-outlined"
                                                    className={styles.iconPlus}
                                                />
                                            </span>
                                            Démarrer une consultation
                                        </Button>
                                        <OverflowMenu
                                            flipped
                                            className={styles.overFlowMenuStyle}
                                            size="lg"
                                        >
                                            <OverflowMenuItem
                                                itemText={t("editPatient")}
                                            //onClick={editPatient}
                                            />
                                            <OverflowMenuItem
                                                itemText={t("visitLabel", "Declasser dossier")}
                                                onClick={() => {
                                                    ""
                                                }}
                                            />
                                            <OverflowMenuItem
                                                itemText={t("addSignsVital", "addSignsVital")}
                                                onClick={() => {
                                                    //navigate(toAddSignVital);
                                                    ""
                                                }}
                                            />
                                        </OverflowMenu>
                                    </Column>
                                </Row>
                            </Column>
                            <Column className={styles} lg={12}>
                                <Row className={styles}>
                                    <Column className={styles.pm0} lg={6}>
                                            {patient.dead ? (
                                                <p className={styles.vital}>
                                                    <Icon icon="bi:heart-pulse-fill" className={styles.iconHeartGray} />
                                                    {t("deathLabel","Mort")} 
                                                </p>
                                            ) : (
                                                <p className={styles.vital}>
                                                    <Icon icon="bi:heart-pulse-fill" className={styles.iconHeartRed} />
                                                    {t("aliveLabel","En vie")} 
                                                </p>
                                            )}
                                    </Column>
                                    <Column className={styles.pm0}>
                                        <div className={styles.buttonGroup}>
                                            <Button kind="tertiary" size="sm" className={styles.buttonAction}>
                                                <span>
                                                    <Icon icon="healthicons:inpatient-outline" className={styles.iconAction} />
                                                </span>
                                            </Button>
                                            <Button kind="tertiary" size="sm" className={styles.buttonAction}>
                                                <span>
                                                    <Icon icon="healthicons:death" className={styles.iconAction} />
                                                </span>
                                            </Button>
                                            <Button kind="tertiary" size="sm" className={`${styles.buttonAction} ${styles.selected}`}>
                                                <span>
                                                    <Icon icon="mdi:calendar-clock-outline" className={styles.iconAction} />
                                                </span>
                                            </Button>
                                        </div>
                                    </Column>
                                </Row>
                            </Column>
                        </Column>
                    </Row>
                    <div className={styles.hr}></div>
                </Column>
                <Column className={styles.pm0}>
                    <CardBody patient={patient} />
                </Column>
            </Grid>
        </Tile>
    );
};
export default DashCard;
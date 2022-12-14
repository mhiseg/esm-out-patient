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
import { endVisit, newVisit, today } from "../../../resources/resources";
import { ConfirmationModal } from "../confirmation-modal";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";

const DashCard = ({ patient }) => {
    const { t } = useTranslation();
    const date = new Date().toISOString();
    const [activeVisit, setActiveVisit] = useState(patient?.currentVisit);
    const [openModal, setOpenModal] = useState(false);
    const toEditPatient: NavigateOptions = { to: window.spaBase + "/out-patient/patient/" + patient.id };
    const editPatient = (e) => { navigate(toEditPatient) };
    const toDeclareDeath: NavigateOptions = { to: window.spaBase + "/death/declare/patient/" + patient.id };
    const killPatient = (e) => { navigate(toDeclareDeath) };

    return (
        <Tile className={styles.cardProps} light={true}>
            <Grid className={styles.pm0} fullWidth={true}>
                <Column className={styles.pm0}>
                    <Row className={styles.pm0}>
                        <Column sm={1} md={1} lg={1} className={styles.photo}>
                        <img src= {require("../../../widget/imageNotFound.png")} />
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
                                            {activeVisit ? <label className={styles.cardBoxActiveVisit} >{t("activeVisitLabel", "Active")}</label> : <label className={styles.cardBox} >{t("inactiveVisitLabel", "Inactive")}</label>}
                                        </p>
                                        <p className={styles.dossier}><span>No dossier:</span>{patient.No_dossier} </p>

                                    </Column>

                                    <Column >
                                        {(activeVisit && !patient.dead)
                                            ? <Button kind="tertiary" size="sm" isSelected={true} className={styles.endConsultationButton}
                                                onClick={() => { setOpenModal(true) }}>
                                                <span>
                                                    <Icon icon="jam:stop-sign" className={styles.iconPlus} />
                                                </span>
                                                {t("stopVisitButton", "Terminer une consultation")}
                                            </Button>

                                            : <Button kind="tertiary" size="sm" isSelected={true} className={styles.consultationButton}
                                                onClick={() => { newVisit(t, patient.id, setActiveVisit) }}>
                                                <span>
                                                    <Icon
                                                        icon="ant-design:plus-circle-outlined"
                                                        className={styles.iconPlus}
                                                    />
                                                </span>
                                                {t("activeVisitButton", "D??marrer une consultation")}
                                            </Button>
                                        }

                                        <OverflowMenu
                                            flipped
                                            className={styles.overFlowMenuStyle}
                                            size="lg"
                                        >
                                            <OverflowMenuItem
                                                itemText={t("editPatient","Modifier les infos de base")}
                                            onClick={editPatient}
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
                                                {t("deathLabel", "Mort")}
                                            </p>
                                        ) : (
                                            <p className={styles.vital}>
                                                <Icon icon="bi:heart-pulse-fill" className={styles.iconHeartRed} />
                                                {t("aliveLabel", "En vie")}
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
                                                    <Icon icon="healthicons:death" className={styles.iconAction} onClick={killPatient}/>
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
            <ConfirmationModal
                confirmModal={() => { 
                    endVisit(date, t, activeVisit, setActiveVisit);
                    setOpenModal(false);
                 }}
                closeModal={setOpenModal}
                modalState={openModal}
                patientName={ patient.firstName + ", " + patient.lastName}
            />
        </Tile>
    );
};
export default DashCard;
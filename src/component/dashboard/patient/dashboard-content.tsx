import { Column, Grid, Row } from "carbon-components-react";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.scss";
import { useTranslation } from "react-i18next";
import DashCard from "./dashboard-card/dash-card";
import { Icon } from "@iconify/react";
import ChartVitalSigns from "./chart-field-component";
import { encounterVitalSign } from "../../resources/constants";
import { getDateWithMonthOlder, getFieldById, lastSignsVitaux, options } from "../../resources/form-resource";
import { getEncounterByPatientAndEncounterTypeAndStartDate, getObsInEncounters } from "../../resources/resources";
import form from "../../resources/vital-sign.json";
import { Calendar } from "./calendar/calendar-component";
//import Calendar from 'react-calendar';

const DashboardContent = ({ patient }) => {
    const { t } = useTranslation();
    const [values, setValues] = useState([]);


    useEffect(() => {
        getEncounterByPatientAndEncounterTypeAndStartDate(patient.id, encounterVitalSign, getDateWithMonthOlder(new Date(), 4)).then((encounters) => {
            getObsInEncounters(encounters?.data?.results).then(
                res => {
                    let data = [];
                    res.map((val, i) => {
                        if (val.question == getFieldById("cardiacFrequency", form).question) {
                            data.push({
                                "group": "F-cardiaque",
                                "date": val.date,
                                "value": val.answers,
                            })
                        } else if (val.question == getFieldById("respiratoryRate", form).question) {
                            data.push({
                                "group": "F-respiratoire",
                                "date": val.date,
                                "value": val.answers,
                            })
                        } else if (val.question == getFieldById("temp", form).question) {
                            data.push({
                                "group": "Temp",
                                "date": val.date,
                                "value": val.answers,
                            })
                        }
                        else if (val.question == getFieldById("taSystole", form).question) {
                            data.push({
                                "group": "TA Systole",
                                "date": val.date,
                                "value": val.answers,
                            })
                        }
                        else if (val.question == getFieldById("taDiastole", form).question) {
                            data.push({
                                "group": "TA Diastole",
                                "date": val.date,
                                "value": val.answers,
                            })
                        }
                    })
                    setValues(data);
                }
            )
        })
    }, [])

    const options = {
        "light": false,
        "color": {
            "scale": { "F-respiratoire": "#75B1A5", "F-cardiaque": "#AA138D", "Temp": "#3DFDD0", "TA Systole": "#BD95FD", "TA Diastole": "#8A3FF5" }
        },
        "axes": {
            "bottom": {
                "mapsTo": "date",
                "scaleType": "time"
            },
            "left": {
                "mapsTo": "value",
                "scaleType": "linear"
            }
        },
        "curve": "curveMonotoneX",
        "width": "96%",
        "height": "330px",
    }

    return (
        <>
            <Grid fullWidth={true}>
                <Row>
                    <Column lg={10} className={styles.pm0}>
                        <DashCard patient={patient} />
                    </Column>
                    <Column lg={2} className={styles.pm0}>
                        <Calendar />
                    </Column>
                </Row>
                <Row>
                    <Column lg={6} className={styles.pm0}>
                        <Row className={styles.pm0}>
                            <Column lg={6} className={styles.pm0}>
                                <div className={styles.card1}>
                                    <h6>{t('antecedantsTitle', "Antecedant")} <Icon className={styles.iconTitle} icon="healthicons:clinical-f-outline" /></h6>
                                    <div className={styles.antecedent}> Difficulté à respirer
                                        <Icon className={styles.icon} icon="iconoir:delete-circled-outline" />
                                    </div>
                                </div>
                            </Column>
                            <Column lg={6} className={styles.pm0}>
                                <div className={styles.card1}>
                                    <h6>{t('allergyTitle', "Allergie")} <Icon className={styles.iconTitle} icon="healthicons:allergies-outline" /></h6>
                                    <p>{patient.allergy?.length == 0 ? t('allergyMessaErrorr', "Aucune allergie enregistrée") : ""}</p>
                                    {patient.allergy?.map(values => {
                                        console.log(values?.length);
                                        return (
                                                <p>
                                                    <span>{values?.allergy}---- </span>
                                                    {
                                                    values?.reactions.length >= 2
                                                        ? values.reactions[0]?.reaction.display + "," + values.reactions[1]?.reaction.display + " " + "(" + values?.reactions?.length + ")"
                                                        : values.reactions[0]?.reaction.display
                                                    }
                                                </p>
                                        );
                                    })}
                                </div>
                            </Column>
                        </Row>
                        <Column className={styles.pm0}>
                            <div className={styles.card3}>
                                <h6>{t('diagnosticTitle', "Diagnostique")} <Icon className={styles.iconTitle} icon="healthicons:biochemistry-laboratory-outline" /></h6>
                            </div>
                        </Column>
                    </Column>
                    <Column lg={6} className={styles.pm0}>
                        <Column className={styles.pm0}>
                            <div className={styles.card2}>
                                <h6>{t('vitalSigneTitle',"Signe vitaux")}<Icon className={styles.iconTitle} icon="fluent:heart-pulse-20-regular" /></h6>
                                <p className={styles.recentSigns}>Récent :</p>
                                <Row className={styles.hr}>
                                    <Column lg={6}>
                                        <p><span>{t('frequenceC')} : </span>{lastSignsVitaux("F-cardiaque", values)}</p>
                                        <p><span>{t('frequenceR')} : </span>{lastSignsVitaux("F-respiratoire", values)}</p>
                                        <p><span>{t('temperature')} : </span>{lastSignsVitaux("Temp", values)}</p>
                                    </Column>
                                    <Column lg={6}>
                                        <p><span>{t('TaDiastole')} : </span>{lastSignsVitaux("TA Diastole", values)}</p>
                                        <p><span>{t('TaSystole')} : </span>{lastSignsVitaux("TA Systole", values)}</p>
                                    </Column>
                                </Row>
                                <ChartVitalSigns data={values} options={options} />
                            </div>
                        </Column>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default DashboardContent;
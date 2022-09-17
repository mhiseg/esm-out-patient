import { Column, Grid, Row } from "carbon-components-react";
import React, { useState } from "react";
import styles from "./dashboard.scss";
import { useTranslation } from "react-i18next";
import DashCard from "./dashboard-card/dash-card";
import { Icon } from "@iconify/react";
import ChartVitalSigns from "./chart-field-component";
import { Calendar } from "./calendar/calendar-component";



const DashboardContent = ({ patient }) => {
    const { t } = useTranslation();
    

    let state = {
        data: [
            {
                "group": "F-respiratoire",
                "date": "2019-01-02T05:00:00.000Z",
                "value": 0,
                "surplus": 16190.372031971767
            },
            {
                "group": "F-respiratoire",
                "date": "2019-01-06T05:00:00.000Z",
                "value": 57312,
                "surplus": 785490321.4260587
            },
            {
                "group": "F-respiratoire",
                "date": "2019-01-08T05:00:00.000Z",
                "value": 27432,
                "surplus": 487195957.0095622
            },
            {
                "group": "mobilite",
                "date": "2019-01-15T05:00:00.000Z",
                "value": 70323,
                "surplus": 750147611.159392
            },
            {
                "group": "mobilite",
                "date": "2019-01-19T05:00:00.000Z",
                "value": 21300,
                "surplus": 366680575.34008896
            },
            {
                "group": "mobilite",
                "date": "2019-01-02T05:00:00.000Z",
                "value": 20000,
                "surplus": 449083596.2270672
            },
            {
                "group": "F-cardiaque",
                "date": "2019-01-06T05:00:00.000Z",
                "value": 37312,
                "surplus": 385442604.63402385
            },
            {
                "group": "F-cardiaque",
                "date": "2019-01-08T05:00:00.000Z",
                "value": 51432,
                "surplus": 648998378.2324682
            },
            {
                "group": "F-cardiaque",
                "date": "2019-01-15T05:00:00.000Z",
                "value": 25332,
                "surplus": 601955968.6356899
            },
            {
                "group": "F-cardiaque",
                "date": "2019-01-19T05:00:00.000Z",
                "value": null,
                "surplus": 1889.9243467256133
            }
        ],
        options: {
            "light": false,
            "color": {
                "scale": {
                    "F-respiratoire": "#FB000F",
                    "F-cardiaque": "#07066F",
                    "Dataset 3": "#FEA903",
                    "Dataset 4": "#FEA903"
                }
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
    };

    return (
        <>
            <Grid fullWidth={true}>
                <Row>
                    <Column lg={10} className={styles.pm0}>
                        <DashCard patient={patient} />
                    </Column>
                    <Column lg={2} className={styles.pm0}>
                        <Calendar/>
                    </Column>
                </Row>
                <Row>
                    <Column lg={6} className={styles.pm0}>
                        <Row className={styles.pm0}>
                            <Column lg={6} className={styles.pm0}>
                                <div className={styles.card1}>
                                    <h6>Antecedant <Icon className={styles.iconTitle} icon="healthicons:clinical-f-outline" /></h6>
                                    <div className={styles.antecedent}> Difficulté à respirer
                                        <Icon className={styles.icon} icon="iconoir:delete-circled-outline" />
                                    </div>
                                </div>
                            </Column>
                            <Column lg={6} className={styles.pm0}>
                                <div className={styles.card1}>
                                    <h6>Allergie <Icon className={styles.iconTitle} icon="healthicons:allergies-outline" /></h6>
                                    <p><span>Blé ---- </span>Anémie</p>
                                    <p><span>Morphine ---- </span>Anémie, toux</p>
                                    <p><span>Pollen ---- </span>Irritation gastro-intestinal</p>
                                </div>
                            </Column>
                        </Row>
                        <Column className={styles.pm0}>
                            <div className={styles.card3}>
                                <h6>Diagnostique <Icon className={styles.iconTitle} icon="healthicons:biochemistry-laboratory-outline" /></h6>
                            </div>
                        </Column>
                    </Column>
                    <Column lg={6} className={styles.pm0}>
                        <Column className={styles.pm0}>
                            <div className={styles.card2}>
                                <h6>Signes vitaux <Icon className={styles.iconTitle} icon="fluent:heart-pulse-20-regular" /></h6>
                                <p className={styles.recentSigns}>Récent :</p>
                                <Row className={styles.hr}>
                                    <Column lg={6}>
                                        <p><span>Pouls : </span>80</p>
                                        <p><span>Frequence respiratoire : </span>70</p>
                                        <p><span>Temperature : </span>32</p>
                                    </Column>
                                    <Column lg={6}>
                                        <p><span>Dysatole : </span>120</p>
                                        <p><span>Systole : </span>80</p>
                                    </Column>
                                </Row>
                                <ChartVitalSigns data={state.data} options={state.options}/>
                            </div>
                        </Column>
                        {/* <Column className={styles.pm0}>
                            <div className={styles.card4}>
                                <h6>Rendez-vous</h6>
                            </div>
                        </Column> */}
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default DashboardContent;
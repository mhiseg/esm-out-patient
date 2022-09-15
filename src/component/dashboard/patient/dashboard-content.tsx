import { Column, Grid, Row } from "carbon-components-react";
import React from "react";
import styles from "./dashboard.scss";
import { useTranslation } from "react-i18next";
import DashCard from "./dashboard-card/dash-card";
import { LineChart } from "@carbon/charts-react";
import ChartVitalSigns from "../../vital-signs-patient/form/chart/chart-field-component";
import { Icon } from "@iconify/react";



const DashboardContent = ({ patient }) => {
    const { t } = useTranslation();
    const options = {
        "light": false,
        "color": { "scale": { "F-respiratoire": "#FB000F", "F-cardiaque": "#14FF00", "Temp": "#FEA903", "TA Systole": "#F700FC", "TA Diastole": "#07066F" } },
        "axes": {
            "bottom": { "mapsTo": "date", "scaleType": "time" },
            "left": { "mapsTo": "value", "scaleType": "linear" }
        },
        "height": "200px",
        "toolbar": { "enabled": false }
    }

    let state = {
        data: [
            {
                "group": "Dataset 1",
                "key": "Qty",
                "value": 34200
            },
            {
                "group": "Dataset 1",
                "key": "More",
                "value": 23500
            },
            {
                "group": "Dataset 1",
                "key": "Sold",
                "value": 53100
            },
            {
                "group": "Dataset 1",
                "key": "Restocking",
                "value": 42300
            },
            {
                "group": "Dataset 1",
                "key": "Misc",
                "value": 12300
            },
            {
                "group": "Dataset 2",
                "key": "Qty",
                "value": 34200
            },
            {
                "group": "Dataset 2",
                "key": "More",
                "value": 53200
            },
            {
                "group": "Dataset 2",
                "key": "Sold",
                "value": 42300
            },
            {
                "group": "Dataset 2",
                "key": "Restocking",
                "value": 21400
            },
            {
                "group": "Dataset 2",
                "key": "Misc",
                "value": 0
            },
            {
                "group": "Dataset 3",
                "key": "Qty",
                "value": 41200
            },
            {
                "group": "Dataset 3",
                "key": "More",
                "value": 18400
            },
            {
                "group": "Dataset 3",
                "key": "Sold",
                "value": 34210
            },
            {
                "group": "Dataset 3",
                "key": "Restocking",
                "value": 1400
            },
            {
                "group": "Dataset 3",
                "key": "Misc",
                "value": 42100
            },
            {
                "group": "Dataset 4",
                "key": "Qty",
                "value": 22000
            },
            {
                "group": "Dataset 4",
                "key": "More",
                "value": 1200
            },
            {
                "group": "Dataset 4",
                "key": "Sold",
                "value": 9000
            },
            {
                "group": "Dataset 4",
                "key": "Restocking",
                "value": 24000,
                "audienceSize": 10
            },
            {
                "group": "Dataset 4",
                "key": "Misc",
                "value": 3000,
                "audienceSize": 10
            }
        ],
        options: {
            "curve": "curveMonotoneX",
            "title": "Line (time series)",
            "axes": {
                "bottom": {
                    "title": "2019 Annual Sales Figures",
                    "mapsTo": "date",
                    "scaleType": "time"
                },
                "left": {
                    "mapsTo": "value",
                    "title": "Conversion rate",
                    "scaleType": "linear"
                }
            },
            "height": "300px"
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
                        calendar
                    </Column>
                </Row>
                <Row>
                    <Column lg={6} className={styles.pm0}>
                        <Row className={styles.pm0}>
                            <Column lg={6} className={styles.pm0}>
                                <div className={styles.card1}>
                                    <h6>Antecedant</h6>
                                    <div className={styles.antecedent}> Difficulté à respirer
                                        <Icon className={styles.icon} icon="iconoir:delete-circled-outline" />
                                    </div>
                                </div>
                            </Column>
                            <Column lg={6} className={styles.pm0}>
                                <div className={styles.card1}>
                                    <h6>Allergie</h6>
                                    <p><span>Blé ---- </span>Anémie</p>
                                    <p><span>Morphine ---- </span>Anémie, toux</p>
                                    <p><span>Pollen ---- </span>Irritation gastro-intestinal</p>
                                </div>
                            </Column>
                        </Row>
                        <Column className={styles.pm0}>
                            <div className={styles.card3}>
                                <h6>Diagnostique</h6>
                            </div>
                        </Column>
                    </Column>
                    <Column lg={6} className={styles.pm0}>
                        <Column className={styles.pm0}>
                            <div className={styles.card2}>
                                <h6>Signes vitaux</h6>
                                <p>Récent:</p>
                                <Row className={styles.pm0}>
                                    <Column lg={6} className={styles.pm0}>
                                        <p><span>Pouls: </span>80</p>
                                        <p><span>Frequence respiratoire: </span>70</p>
                                        <p><span>Temperature: </span>80</p>

                                        <footer></footer>
                                    </Column>
                                    <Column lg={6} className={styles.pm0}>
                                        <p><span>Dysatole: </span>120</p>
                                        <p><span>Systole: </span>80</p>
                                    </Column>
                                </Row>

                                {/* <LineChart options={state.options} data={state.data}></LineChart> */}
                            </div>
                        </Column>
                        <Column className={styles.pm0}>
                            <div className={styles.card4}>
                                <h6>Rendez-vous</h6>
                            </div>
                        </Column>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default DashboardContent;
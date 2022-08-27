import React, { useState } from "react";
import styles from "./vital-signs.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import { navigate, NavigateOptions, Visit } from "@openmrs/esm-framework";
import ChartVitalSigns from "./form/chart/chart-field-component";
import FieldVitalForm from "./form/field/vital-signs-field-component";

export interface VisitProps {
    visit?: Visit;
}

export const VitalSignsForm: React.FC<VisitProps> = ({ visit }) => {
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
                "group": "F-respiratoire",
                "date": "2019-01-15T05:00:00.000Z",
                "value": 70323,
                "surplus": 750147611.159392
            },
            {
                "group": "F-respiratoire",
                "date": "2019-01-19T05:00:00.000Z",
                "value": 21300,
                "surplus": 366680575.34008896
            },
            {
                "group": "F-cardiaque",
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
            //"curve": "curveMonotoneX",
            "width": "100%",
            "height": "200px",
            "toolbar": {
                "enabled": false
            }
        }
    };
    const toSearch: NavigateOptions = { to: window.spaBase + "/out-patient/search" };
    const { t } = useTranslation();

    const formatInialValue = (visit) => {
        return {
            mobility: "",
            respiratoryRate: "",
            cardiacFrequency: "",
            taSystole: "",
            taDiastole: "",
            temp: "",
            neuro: "",
            trauma: "",
        }
    }

    const [initialV, setInitialV] = useState(formatInialValue(visit));
    const vitalSchema = Yup.object().shape({
        mobility: Yup.object().required("Ce champ ne peu pas etre vide"),
        respiratoryRate: Yup.number().required("Ce champ ne peu pas etre vide"),
        cardiacFrequency: Yup.number().required("Ce champ ne peu pas etre vide"),
        taSystole: Yup.number().required("Ce champ ne peu pas etre vide"),
        taDiastole: Yup.number().required("Ce champ ne peu pas etre vide"),
        temp: Yup.number().required("Ce champ ne peu pas etre vide"),
        neuro: Yup.object().required("Ce champ ne peu pas etre vide"),
        trauma: Yup.object().required("Ce champ ne peu pas etre vide"),
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialV}
            validationSchema={vitalSchema}
            onSubmit={
                (values, { setSubmitting }) => {
                    console.log(values);
                    // setSubmitting(false)
                }
            }
        >
            {(formik) => {
                const {
                    handleSubmit,
                    resetForm,
                    isValid,
                    dirty
                } = formik;
                return (
                    <Form name="form" className={styles.cardForm} onSubmit={handleSubmit}>
                        <Grid fullWidth={true} className={styles.p0}>
                            <Row className={styles.pr}>
                                <Column sm={12} md={12} lg={3}>
                                    {FieldVitalForm("mobility")}
                                    {FieldVitalForm("respiratoryRate")}
                                    {FieldVitalForm("cardiacFrequency")}
                                    {FieldVitalForm("systole")}
                                    {FieldVitalForm("diastole")}
                                    {FieldVitalForm("temperature")}
                                    {FieldVitalForm("neuro")}
                                    {FieldVitalForm("trauma")}
                                </Column>
                                <Column className={styles.secondColStyle} sm={12} md={12} lg={9}>
                                    <ChartVitalSigns data={state.data} options={state.options} title={'FR/FC'} />
                                    <ChartVitalSigns data={state.data} options={state.options} title={'TA'} />
                                    <ChartVitalSigns data={state.data} options={state.options} title={'Temp'} />
                                </Column>
                            </Row>

                            <Row>
                                <Column>
                                    <Row>
                                        <Column className={styles.marginTop} lg={12} >
                                            <div className={styles.flexEnd}>
                                                <Button
                                                    className={styles.buttonStyle}
                                                    kind="danger--tertiary"
                                                    size="sm"
                                                    isSelected={true}
                                                    onClick={() => navigate(toSearch)}
                                                >
                                                    {t("cancelButton", "Annuler")}
                                                </Button>
                                                <Button
                                                    className={styles.buttonStyle2}
                                                    kind="tertiary"
                                                    type="reset"
                                                    size="sm"
                                                    isSelected={true}
                                                >
                                                    {t("resetButton", "Réinitialiser")}
                                                </Button>
                                                <Button
                                                    className={styles.buttonStyle3}
                                                    kind="tertiary"
                                                    type="submit"
                                                    size="sm"
                                                    isSelected={true}
                                                    disabled={!(dirty && isValid)}
                                                >
                                                    {t("confirmButton", "Enregistrer")}
                                                </Button>
                                            </div>
                                        </Column>
                                    </Row>
                                </Column>
                            </Row>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
}


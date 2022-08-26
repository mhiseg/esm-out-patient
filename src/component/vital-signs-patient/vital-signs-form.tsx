import React, { useState } from "react";
import styles from "./vital-signs.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import { navigate, NavigateOptions, reset, showToast, Visit } from "@openmrs/esm-framework";
import { cinUuid, countryName, habitatConcept, maritalStatusConcept, occupationConcept, sourceUuid, uuidBirthPlace, uuidIdentifier, uuidIdentifierLocation, uuidPhoneNumber } from "../resources/constants";
import ChartVitalSigns from "./form/chart/chart-field-component";
import FieldVitalForm from "./form/field/vital-signs-field-component";
import { formatCin, formatNif } from "../registration-patient/patient-form/input/custom-input/idenfiersInput/id-utils";
import { Obs, Patient, relationshipType } from "../resources/types";

export interface VisitProps {
    visit?: Visit;
}

export const VitalSignsForm: React.FC<VisitProps> = ({ visit }) => {
    let state = {
        data: [
            {
                "group": "Dataset 2",
                "date": "2019-01-02T05:00:00.000Z",
                "value": 0,
                "surplus": 16190.372031971767
            },
            {
                "group": "Dataset 2",
                "date": "2019-01-06T05:00:00.000Z",
                "value": 57312,
                "surplus": 785490321.4260587
            },
            {
                "group": "Dataset 2",
                "date": "2019-01-08T05:00:00.000Z",
                "value": 27432,
                "surplus": 487195957.0095622
            },
            {
                "group": "Dataset 2",
                "date": "2019-01-15T05:00:00.000Z",
                "value": 70323,
                "surplus": 750147611.159392
            },
            {
                "group": "Dataset 2",
                "date": "2019-01-19T05:00:00.000Z",
                "value": 21300,
                "surplus": 366680575.34008896
            },
            {
                "group": "Dataset 4",
                "date": "2019-01-02T05:00:00.000Z",
                "value": 20000,
                "surplus": 449083596.2270672
            },
            {
                "group": "Dataset 4",
                "date": "2019-01-06T05:00:00.000Z",
                "value": 37312,
                "surplus": 385442604.63402385
            },
            {
                "group": "Dataset 4",
                "date": "2019-01-08T05:00:00.000Z",
                "value": 51432,
                "surplus": 648998378.2324682
            },
            {
                "group": "Dataset 4",
                "date": "2019-01-15T05:00:00.000Z",
                "value": 25332,
                "surplus": 601955968.6356899
            },
            {
                "group": "Dataset 4",
                "date": "2019-01-19T05:00:00.000Z",
                "value": null,
                "surplus": 1889.9243467256133
            }
        ],
        options: {
            "light": true,
            "color": {
                "scale": {
                    "Dataset 1": "#925699",
                    "Dataset 2": "#525669",
                    "Dataset 3": "#725699",
                    "Dataset 4": "#ccc"
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
            "style": {
                "background": "none"
            },
            "curve": "curveMonotoneX",
            "height": "200px"
        }
    };
    const abortController = new AbortController();
    const toSearch: NavigateOptions = { to: window.spaBase + "/out-patient/search" };
    const { t } = useTranslation();

    const formatInialValue = (visit) => {
        return {
            mobilite: "",
            frequenceR: "",
            frequenceC: "",
            taSystole: "",
            taDiastole: "",
            temp: "",
            neuro: "",
            trauma: "",
        }
    }
    const getAnswerObs = (question: string, obs: Obs[]) => {
        return obs?.find((o) => o?.concept === question) || { concept: question };
    }

    const [initialV, setInitialV] = useState(formatInialValue(visit));
    const vitalSchema = Yup.object().shape({
        mobilite: Yup.object().required("Ce champ ne peu pas etre vide"),
        frequenceR: Yup.number().required("Ce champ ne peu pas etre vide"),
        frequenceC: Yup.number().required("Ce champ ne peu pas etre vide"),
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
                async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                }
            }
        >
            {(formik) => {
                const {
                    values,
                    handleSubmit,
                    errors,
                    touched,
                    setFieldValue,
                    resetForm,
                    isValid,
                    dirty
                } = formik;
                return (
                    <Form name="form" className={styles.cardForm} onSubmit={handleSubmit}>
                        <Grid fullWidth={true} className={styles.p0}>
                            <Row>
                                <Column className={styles.firstColSyle} lg={3}>
                                    {FieldVitalForm("mobility")}
                                    {FieldVitalForm("respiratoryRate")}
                                    {FieldVitalForm("cardiacFrequency")}
                                    {FieldVitalForm("systole")}
                                    {FieldVitalForm("diastole")}
                                    {FieldVitalForm("temperature")}
                                    {FieldVitalForm("neuro")}
                                    {FieldVitalForm("trauma")}
                                </Column>
                                <Column className={styles.secondColStyle}>
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
                                                    type="reset"
                                                    size="sm"
                                                    isSelected={true}
                                                    onClick={() => navigate(toSearch)}
                                                >
                                                    {t("cancelButton", "Annuler")}
                                                </Button>
                                                <Button
                                                    className={styles.buttonStyle2}
                                                    type="reset"
                                                    size="sm"
                                                    isSelected={true}
                                                    onClick={() => resetForm()}
                                                >
                                                    {t("resetButton", "réinitialiser")}
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


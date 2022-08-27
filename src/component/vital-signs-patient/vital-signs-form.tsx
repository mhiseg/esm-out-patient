import React, { useEffect, useState } from "react";
import styles from "./vital-signs.scss"
import * as Yup from 'yup';
import { Field, Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import { navigate, NavigateOptions, showToast, Visit } from "@openmrs/esm-framework";
import ChartVitalSigns from "./form/chart/chart-field-component";
import FieldVitalForm from "./form/field/vital-signs-field-component";
import { getSynchronizedCurrentUser } from "../resources/patient-resources";
export interface VisitProps {
    visit?: Visit;
}

import form from "../resources/vital-sign.json";
import { fetchConceptByUuid, getConceptAnswer, saveAllObs, saveEncounter, toDay } from "../resources/resources";
import { encounterVitalSign, unknowLocation } from "../resources/constants";
import { saveVisit } from "../resources/form-resource";

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
            "height": "200px",
            "toolbar": {
                "enabled": false
            }
        }
    };
    const toSearch: NavigateOptions = { to: window.spaBase + "/out-patient/search" };
    const { t } = useTranslation();
    const [mobilities, setMobilities] = useState({ question: "", answers: [] });
    const [neuros, setNeuros] = useState({ question: "", answers: [] });
    const [traumas, setTraumas] = useState({ question: "", answers: [] });
    const abortController = new AbortController();
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
    const getConceptById = (id: string, f) => f.fields.find(field => field.id === id)

    useEffect(() => {
        const initialValue = () => {
            getSynchronizedCurrentUser({ includeAuthStatus: true }).subscribe(async user => {
                await fetchConceptByUuid(getConceptById("mobility", form)?.question, localStorage.getItem("i18nextLng")).then(res => {
                    setMobilities({ question: res.data.display, answers: res.data.answers });
                })
                await fetchConceptByUuid(getConceptById("neuro", form)?.question, localStorage.getItem("i18nextLng")).then(res => {
                    setNeuros({ question: res.data.display, answers: res.data.answers });
                })
                await fetchConceptByUuid(getConceptById("trauma", form)?.question, localStorage.getItem("i18nextLng")).then(res => {
                    setTraumas({ question: res.data.display, answers: res.data.answers });
                })

            })
        }
        return initialValue();
    }, [])

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

    const getField = (id, form, values) => {
        switch (id) {
            case "mobility":
                return { question: form.fields.find(field => field.id == id).question, answers: values.mobility.answers };
            case "respiratoryRate":
                return { question: form.fields.find(field => field.id == id).question, answers: values.respiratoryRate };
            case "cardiacFrequency":
                return { question: form.fields.find(field => field.id == id).question, answers: values.cardiacFrequency };
            case "taSystole":
                return { question: form.fields.find(field => field.id == id).question, answers: values.taSystole };
            case "taDiastole":
                return { question: form.fields.find(field => field.id == id).question, answers: values.taDiastole };
            case "temp":
                return { question: form.fields.find(field => field.id == id).question, answers: values.temp };
            case "neuro":
                return { question: form.fields.find(field => field.id == id).question, answers: values.neuro.answers };
            case "trauma":
                return { question: form.fields.find(field => field.id == id).question, answers: values.trauma.answers };
        }
    }

    const save = async (values) => {
        const obs = Object.keys(values).map(value => getField(value, form, values))
        try {
            saveEncounter({ patient: visit.patient.uuid, encounterDatetime: toDay(), encounterType: encounterVitalSign, location: unknowLocation }, abortController).then(async (encounter) => {
                await saveAllObs(obs, visit.patient.uuid, abortController, encounter.data.uuid);
                await saveVisit({ encounters: [...visit.encounters, encounter.data.uuid] }, abortController, visit.uuid);
                showToast({
                    title: t('successfullyAdded', 'Successfully added'),
                    kind: 'success',
                    description: 'Patient save succesfully',
                })
            })

        } catch (err) {
            showToast({ description: err.message })
        }
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialV}
            validationSchema={vitalSchema}
            onSubmit={
                (values, { setSubmitting }) => {
                    setSubmitting(true)
                    save(values)
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
                                    {FieldVitalForm("mobility", mobilities)}
                                    {FieldVitalForm("respiratoryRate")}
                                    {FieldVitalForm("cardiacFrequency")}
                                    {FieldVitalForm("systole")}
                                    {FieldVitalForm("diastole")}
                                    {FieldVitalForm("temperature")}
                                    {FieldVitalForm("neuro", neuros)}
                                    {FieldVitalForm("trauma", traumas)}
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


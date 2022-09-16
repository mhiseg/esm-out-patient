import React, { useEffect, useState } from "react";
import styles from "./vital-signs.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import { navigate, NavigateOptions, showToast, Visit } from "@openmrs/esm-framework";
import ChartVitalSigns from "./form/chart/chart-field-component";
import FieldVitalForm from "./form/field/vital-signs-field-component";
import { getSynchronizedCurrentUser } from "../resources/patient-resources";
import form from "../resources/vital-sign.json";
import { fetchConceptByUuid, getObsInEncounters, saveAllObs, saveEncounter, toDay } from "../resources/resources";
import { encounterVitalSign, unknowLocation } from "../resources/constants";
import PatientCard from "../search-patient/patient-card/patient-card";
import { getFieldById, options } from "../resources/form-resource";

export interface VisitProps {
    visit?: Visit;
}
export const VitalSignsForm: React.FC<VisitProps> = ({ visit }) => {
    const [dataFC, setDataFC] = useState([]);
    const [dataTemp, setDataTemp] = useState([]);
    const [dataTA, setDataTA] = useState([]);
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
    useEffect(() => {
        const getDefaultAnswersValues = () => {
            getSynchronizedCurrentUser({ includeAuthStatus: true }).subscribe(async user => {
                await fetchConceptByUuid(getFieldById("mobility", form)?.question, localStorage.getItem("i18nextLng")).then(res => {
                    setMobilities({ question: res.data.display, answers: res.data.answers });
                })
                await fetchConceptByUuid(getFieldById("neuro", form)?.question, localStorage.getItem("i18nextLng")).then(res => {
                    setNeuros({ question: res.data.display, answers: res.data.answers });
                })
                await fetchConceptByUuid(getFieldById("trauma", form)?.question, localStorage.getItem("i18nextLng")).then(res => {
                    setTraumas({ question: res.data.display, answers: res.data.answers });
                })
            })
        }
        return getDefaultAnswersValues();
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

    useEffect(() => {
        // formatPatientForCard(visit.patient).then((p) => setPatient(p));
        getObsInEncounters(visit.encounters).then(
            res => {
                let valFC = [];
                let valTemp = [];
                let valTA = [];
                res.map(val => {
                    if (val.question == getFieldById("cardiacFrequency", form).question) {
                        valFC.push({
                            "group": "F-cardiaque",
                            "date": val.date,
                            "value": val.answers,
                        })
                    } else if (val.question == getFieldById("respiratoryRate", form).question) {
                        valFC.push({
                            "group": "F-respiratoire",
                            "date": val.date,
                            "value": val.answers,
                        })
                    } else if (val.question == getFieldById("temp", form).question) {
                        valTemp.push({
                            "group": "Temp",
                            "date": val.date,
                            "value": val.answers,
                        })
                    }
                    else if (val.question == getFieldById("taSystole", form).question) {
                        valTA.push({
                            "group": "TA Systole",
                            "date": val.date,
                            "value": val.answers,
                        })
                    }
                    else if (val.question == getFieldById("taDiastole", form).question) {
                        valTA.push({
                            "group": "TA Diastole",
                            "date": val.date,
                            "value": val.answers,
                        })
                    }
                })
                setDataFC([...dataFC, ...valFC])
                setDataTemp([...dataTemp, ...valTemp]);
                setDataTA([...dataTA, ...valTA]);
            }
        )
    }, [])
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
                showToast({
                    title: t('successfullyAdded', 'Successfully added'),
                    kind: 'success',
                    description: 'Vital signs  form save succesfully',
                })
            })

        } catch (err) {
            showToast({ description: err.message })
        }
    }
    function checkValue(value) {
        return ((value != undefined) ? value : 0);
    }

    function lastSignsVitaux(sign, value) {
        let lastSignsVital = undefined;
        value.map(element => {
            if (element.group == sign) {
                lastSignsVital = element.value;
                if (lastSignsVital.date < element.date) {
                    lastSignsVital = element.value;
                }
            }
        });
        return lastSignsVital;
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
                            <Row className={styles.card}>
                                <PatientCard patient={visit.patient} userRole={undefined} />
                            </Row>
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
                                    <ChartVitalSigns
                                        data={dataFC} options={options}
                                        title={t('FR/FC')}
                                        value={checkValue(lastSignsVitaux("F-respiratoire", dataFC)) + "/" + checkValue(lastSignsVitaux("F-cardiaque", dataFC))}
                                    />
                                    <ChartVitalSigns
                                        data={dataTA}
                                        options={options}
                                        title={t('TaSystole') + '/' + t('TaDiastole')}
                                        value={checkValue(lastSignsVitaux("TA Systole", dataTA)) + "/" + checkValue(lastSignsVitaux("TA Diastole", dataTA))}
                                    />
                                    <ChartVitalSigns
                                        data={dataTemp}
                                        options={options}
                                        title={t('temperature')}
                                        value={checkValue(lastSignsVitaux("Temp", dataTemp))}
                                    />
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

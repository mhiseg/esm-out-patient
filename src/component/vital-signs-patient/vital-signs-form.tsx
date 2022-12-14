import React, { useEffect, useState } from "react";
import styles from "./vital-signs.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form, Link } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import { navigate, NavigateOptions, showToast, Visit } from "@openmrs/esm-framework";
import ChartVitalSigns from "./form/chart/chart-field-component";
import FieldVitalForm from "./form/field/vital-signs-field-component";
import { getSynchronizedCurrentUser } from "../resources/patient-resources";
import form from "../resources/vital-sign.json";
import { fetchConceptByUuid, getObsInEncounters, saveAllObs, saveEncounter, toDay } from "../resources/resources";
import { encounterVitalSign, unknowLocation } from "../resources/constants";
import PatientCard from "../search-patient/patient-card/patient-card";
import { getCurrentUserRoleSession, getFieldById, lastSignsVitaux, options } from "../resources/form-resource";
import { Icon } from "@iconify/react";
import { Profiles } from "../resources/types";

export interface VisitProps {
    visit?: Visit;
}

export const VitalSignsForm: React.FC<VisitProps> = ({ visit }) => {
    const toPatientDashboard: NavigateOptions = { to: window.spaBase + "/out-patient/dashboard/patient/" + visit.patient.id };
    const [userFunc, setUserFunc] = useState([]);
    const [size, setSize] = useState(0);
    const [dataFC, setDataFC] = useState([]);
    const [dataTemp, setDataTemp] = useState([]);
    const [dataTA, setDataTA] = useState([]);
    const [reload, setReload] = useState(false);
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
    };
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
    }, []);

    useEffect(() => {
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
        );
    }, [reload]);

    useEffect(() => {
        getCurrentUserRoleSession().then((UserRole) => {
          setUserFunc(UserRole);
        });
      }, []);

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

    const save = async (values, resetForm) => {
        const obs = Object.keys(values).map(value => getField(value, form, values))
        try {
            saveEncounter({ patient: visit.patient.id, encounterDatetime: toDay(), encounterType: encounterVitalSign, location: unknowLocation }, abortController)
                .then(async (encounter) => {
                    await saveAllObs(obs, visit.patient.id, abortController, encounter.data.uuid);
                    showToast({
                        title: t('successfullyAdded', 'Successfully added'),
                        kind: 'success',
                        description: 'Vital signs  form save succesfully',
                    });
                    setDataFC([...dataFC, {
                        "group": "F-respiratoire",
                        "date": toDay(),
                        "value": getField("respiratoryRate", form, values).answers,
                    },
                    {
                        "group": "F-cardiaque",
                        "date": toDay(),
                        "value": getField("cardiacFrequency", form, values).answers,
                    }
                    ])
                    setDataTemp([...dataTemp, {
                        "group": "Temp",
                        "date": toDay(),
                        "value": getField("temp", form, values).answers
                    }]);
                    setDataTA([...dataTA, {
                        "group": "TA Systole",
                        "date": toDay(),
                        "value": getField("taSystole", form, values).answers,
                    }, {
                        "group": "TA Diastole",
                        "date": toDay(),
                        "value": getField("taDiastole", form, values).answers,
                    }]);
                    resetForm();
                })

        } catch (err) {
            showToast({ description: err.message })
        }
    }

    function checkValue(value) {
        return ((value != undefined) ? value : 0);
    }

    const goToDasboard = (userFunction) => {
        if(userFunction == Profiles.ADMIN || userFunction == Profiles.DOCTOR)
           navigate(toPatientDashboard);
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialV}
            validationSchema={vitalSchema}
            onSubmit={
                (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    save(values,resetForm)
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
                    <Form name="form" onSubmit={handleSubmit}>
                        <Grid fullWidth={true} className={styles.p0}>
                            <Row className={styles.card} >
                                    <h5 onClick={()=>{goToDasboard(userFunc); }}>{visit.patient.firstName + ","} {visit.patient.lastName + " : "} {visit.patient.No_dossier}</h5>
                                    <Icon icon="clarity:info-line" className={styles.infoTooltip} onClick={()=>{size == 0 ? setSize(12) : setSize(0)}}/>
                            </Row>

                             <Row className={styles.pm0}>
                                <Column sm={size} md={size} lg={size} className={styles.pm0}>
                                    <PatientCard patient={visit.patient} userRole={undefined} />
                                </Column>
                                <Column sm={12} md={12} lg={4} className={styles.cardForm}>
                                    <h6>Formulaire des signes vitaux</h6>

                                    {FieldVitalForm("mobility", mobilities)}
                                    {FieldVitalForm("respiratoryRate")}
                                    {FieldVitalForm("cardiacFrequency")}
                                    {FieldVitalForm("systole")}
                                    {FieldVitalForm("diastole")}
                                    {FieldVitalForm("temperature")}
                                    {FieldVitalForm("neuro", neuros)}
                                    {FieldVitalForm("trauma", traumas)}

                                    <Column className={styles.pm0}>
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
                                                {t("resetButton", "R??initialiser")}
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
                                </Column>

                                <Column sm={12} md={12} lg={8} className={styles.secondColStyle}>
                                    <Column className={styles.chartCard}>
                                        <ChartVitalSigns
                                            data={dataFC} options={options}
                                            title={t('FR/FC')}
                                            value={[checkValue(lastSignsVitaux("F-respiratoire", dataFC)), checkValue(lastSignsVitaux("F-cardiaque", dataFC))]}
                                        />
                                    </Column>

                                    <Column className={styles.chartCard}>
                                        <ChartVitalSigns
                                            data={dataTA}
                                            options={options}
                                            title={t('TaSystole') + '/' + t('TaDiastole')}
                                            value={checkValue(lastSignsVitaux("TA Systole", dataTA)) + "/" + checkValue(lastSignsVitaux("TA Diastole", dataTA))}
                                        />
                                    </Column>

                                    <Column className={`${styles.chartCard} ${styles.chartCard3}`}>
                                        <ChartVitalSigns
                                            data={dataTemp}
                                            options={options}
                                            title={t('temperature')}
                                            value={checkValue(lastSignsVitaux("Temp", dataTemp))}
                                        />
                                    </Column>
                                </Column>
                            </Row> 
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
}

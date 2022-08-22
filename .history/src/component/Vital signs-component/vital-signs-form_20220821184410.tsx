import React, { useState } from "react";
import styles from "./vital-signs.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import { navigate, NavigateOptions, showToast } from "@openmrs/esm-framework";
import { Obs, Patient, relationshipType } from "../registration-patient/patient-form/patient-registration/patient-registration-types";
import FieldForm from "../registration-patient/patient-form/patient-registration/field.component";
import { RelationShips } from "../registration-patient/patient-form/patient-registration/field/relationship/relationship-field-component";
import { PatientRegistrationContext } from "../registration-patient/patient-form/patient-registration/patient-registration-context";
import { savePatient, generateIdentifier, saveAllConcepts, saveAllRelationships, formAddres, formatRelationship } from "../registration-patient/patient-form/patient-registration/patient-registration.ressources";
import { cinUuid, countryName, habitatConcept, maritalStatusConcept, occupationConcept, sourceUuid, uuidBirthPlace, uuidIdentifier, uuidIdentifierLocation, uuidPhoneNumber } from "../registration-patient/constants";
import { dob, validateRelationShips, validateId } from "../registration-patient/patient-form/patient-registration/validation/validation-utils";
import { formatCin, formatNif } from "../registration-patient/patient-form/patient-registration/input/custom-input/idenfiersInput/id-utils";
import ChartVitalSigns from "./chart/chart";
import FieldVitalForm from "./field/field-vital-signs.component";

export interface PatientProps {
    patient?: Patient;
    relationships?: relationshipType[];
    obs?: Obs[];
}

export const VitalSignsForm: React.FC<PatientProps> = ({ patient, relationships, obs }) => {
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
            "curve": "curveMonotoneX",
            "height": "200px"
        }
    };
    const abortController = new AbortController();
    const toSearch: NavigateOptions = { to: window.spaBase + "/death/search" };
    const { t } = useTranslation();

    const format = (identifierType, value) => {
        if (identifierType == cinUuid)
            return formatCin(value);
        else
            return formatNif(value);
    }

    const formatInialValue = (patient, obs, getAnswerObs) => {

        console.log({ birthdate: patient?.person?.birthdate, age: patient?.person?.age }, '----------------------')
        return {
            uuid: patient?.uuid,
            encounterUuid: obs ? obs[0]?.encounter : undefined,
            relationships: relationships?.length > 0 ? relationships : [{ givenName: undefined, familyName: undefined, contactPhone: undefined, type: undefined, personUuid: undefined, relationUuid: undefined }],
            identifierType: patient?.identifiers[1]?.identifierType?.uuid || null,
            identifierUuid: patient?.identifiers[1]?.uuid || "",
            givenName: patient?.person?.names[0]?.givenName,
            dob: { birthdate: patient?.person?.birthdate, age: patient?.person?.age },
            status: getAnswerObs(maritalStatusConcept, obs),
            gender: patient?.person?.gender,
            birthPlace: formAddres(patient?.person?.attributes.find((attribute) => attribute?.attributeType?.uuid == uuidBirthPlace)?.value) || "",
            identifier: format(patient?.identifiers[1]?.identifierType?.uuid, patient?.identifiers[1]?.identifier),
            familyName: patient?.person?.names[0]?.familyName,
            occupation: getAnswerObs(occupationConcept, obs),
            residence: formAddres(patient?.person?.addresses[0]) || "",
            phone: patient?.person?.attributes.find((attribute) => attribute.attributeType.uuid == uuidPhoneNumber)?.value || "",
            habitat: getAnswerObs(habitatConcept, obs),
            patient: patient,
        }
    }
    const getAnswerObs = (question: string, obs: Obs[]) => {
        return obs?.find((o) => o?.concept === question) || { concept: question };
    }

    const [initialV, setInitialV] = useState(formatInialValue(patient, obs, getAnswerObs));
    const patientSchema = Yup.object().shape({
        uuid: Yup.string(),
        openmrsId: Yup.string(),
        identifierType: Yup.string().nullable(),
        givenName: Yup.string().required("messageErrorGivenName"),
        dob: Yup.object({
            birthdate: Yup.date(),
            age: Yup.number(),
            months: Yup.number(),
            birthdateEstimated: Yup.boolean()
        }).test("validate date ", ("messageErrorDob"), (value, { createError }) => {
            return dob(value, createError);
        }),
        status: Yup.object(),
        gender: Yup.string().required("messageErrorGender"),
        birthPlace: Yup.object(),
        identifier: Yup.string(),
        familyName: Yup.string().required("messageErrorFamilyName"),
        occupation: Yup.object(),
        residence: Yup.object().nullable(),
        address: Yup.string(),
        phone: Yup.string().min(9, ("messageErrorPhoneNumber")),
        habitat: Yup.object(),
        relationships: Yup.array(
            Yup.object({
                givenName: Yup.string(),
                familyName: Yup.string(),
                contactPhone: Yup.string().min(9, ("messageErrorPhoneNumber")),
                type: Yup.string(),
                personUuid: Yup.string(),
                relationUuid: Yup.string(),
            }).test("valide relationships ", (value, { createError }) => {
                return validateRelationShips(value, createError);
            }),
        )
    }).test("valide relationships ", (value, { createError }) => {
        if (value.address && !value.residence) {
            return createError({
                path: 'residence',
                message: ("messageErrorResidence"),
            });
        }
        return validateId(value, createError);
    });

    const save = async (id, values, resetForm) => {
        let patient: Patient;
        let concepts: Obs[] = [];
        patient = {
            identifiers: [{ identifier: id, identifierType: uuidIdentifier, location: uuidIdentifierLocation, preferred: true }],
            person: {
                names: [{ givenName: values.givenName, familyName: values.familyName, }],
                gender: values.gender,
                attributes: [],
            }
        }
        if (values.identifierType && values.identifier) {
            patient.identifiers.push({ identifier: values.identifier.replace(/\D/g, ""), identifierType: values.identifierType, uuid: values.identifierUuid == "" ? null : values.identifierUuid })
        }
        if (values.dob.birthdateEstimated) {
            patient.person.birthdateEstimated = true;
            patient.person.age = values.dob.age;
        } else {
            patient.person.birthdate = new Date(values.dob.birthdate).toISOString();
        }
        if (values.birthPlace)
            patient.person.attributes = [{ attributeType: uuidBirthPlace, value: values.birthPlace.display, }]
        if (values.phone) {
            patient.person.attributes.push({ attributeType: uuidPhoneNumber, value: values.phone, })
        }
        if (values.residence) {
            patient.person.addresses = [];
            patient.person.addresses.push({
                ...values.residence,
                country: countryName,
            })
        }
        if (values.status) {
            concepts.push({ ...values.status });
        }
        if (values.occupation) {
            concepts.push({ ...values.occupation });
        }
        if (values.habitat) {
            concepts.push({ ...values.habitat });
        }
        savePatient(abortController, patient, values.uuid)
            .then(async (res) => {
                const person = res.data.uuid;
                const relationships: relationshipType[] = values.relationships.filter(relationship => (relationship.givenName || relationship.relationUuid));
                if (relationships.length > 0)
                    await saveAllRelationships(relationships, person, abortController)
                await saveAllConcepts(concepts, person, abortController, values.encounterUuid)
                showToast({
                    title: t('successfullyAdded', 'Successfully added'),
                    kind: 'success',
                    description: 'Patient save succesfully',
                })
                navigate(toSearch);
            })
            .catch(error => {
                showToast({ description: error.message })
            })
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialV}
            validationSchema={patientSchema}
            onSubmit={
                async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    const id = await generateIdentifier(sourceUuid, abortController);
                    save(id.data.identifier, values, resetForm);
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
                    isValid,
                    dirty
                } = formik;
                return (
                    <Form name="form" className={styles.cardForm} onSubmit={handleSubmit}>
                        <Grid fullWidth={true} className={styles.p0}>
                            <PatientRegistrationContext.Provider value={{ setFieldValue: setFieldValue, identifierType: values.identifierType, patient: null }}>
                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        {FieldVitalForm("MobiliteSelect")}
                                    </Column>
                                    <Column className={styles.secondColStyle} lg={6}>
                                        <ChartVitalSigns data={state.data} options={state.options} title={'FR/FC'} />
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        {FieldVitalForm("MobiliteSelect")}
                                    </Column>
                                    <Column className={styles.secondColStyle} lg={6}>
                                        <ChartVitalSigns data={state.data} options={state.options} title={'TA'} />
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        {FieldVitalForm("MobiliteSelect")}
                                    </Column>
                                    <Column className={styles.secondColStyle} lg={6}>
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
                                                        kind="danger--tertiary"
                                                        type="reset"
                                                        size="sm"
                                                        isSelected={true}
                                                        onClick={() => navigate(toSearch)}
                                                    >
                                                        {t("resetButton", "réinitialiser")}
                                                    </Button>
                                                    <Button
                                                        className={styles.buttonStyle}
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
                            </PatientRegistrationContext.Provider>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
}


export const basePath = '${openmrsSpaBase}/patient/';
export const encounterRepresentation =
  'custom:(uuid,encounterDatetime,encounterType,location:(uuid,name),' +
  'patient:(uuid,display),encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,voided,groupMembers,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name),' +
  'names:(uuid,conceptNameType,name))))';

export const uuidIdentifier = '05a29f94-c0ed-11e2-94be-8c13b969e334';
export const uuidIdentifierLocation = '8d6c993e-c2cc-11de-8d13-0010c6dffd0f';
export const uuidPhoneNumber = '14d4f066-15f5-102d-96e4-000c29c2a5d7';
export const sourceUuid = "691eed12-c0f1-11e2-94be-8c13b969e334";
export const uuidBirthPlace = "8d8718c2-c2cc-11de-8d13-0010c6dffd0f";
export const unknowLocation = "58c57d25-8d39-41ab-8422-108a0c277d98";
export const encounterTypeCheckIn = "ca3aed11-1aa4-42a1-b85c-8332fc8001fc";
export const encounterVitalSign = "67a71486-1a54-468f-ac3e-7091a9a79584";
export const countryName = "Haiti";
export const deathValidatedValue = "a7257403780e198072fd77a4536fe8fd";
// registration concept
export const maritalStatusConcept = '1054AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const occupationConcept = '1542AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const habitatConcept = "965014a7-644d-4df8-898b-33cb4d76c326";
export const cinUuid = "72242d84-1e2c-4991-b523-4f86ad115b31";
export const nifUuid = "e7260a40-fb8a-42ec-8e86-caf31be03f60";
// Vital signs concepts
export const mobilityConcept = "efafb3bf-b4a5-4ebd-8e8d-2a5004455d0e";
export const neuroConcept = "ef238621-5a5b-4d9b-951c-1acf79e28738";
export const traumaConcept = "a024ac12-a5cd-4958-b198-f65f88de4a14";
export const respiratoryRateConcept = "5242AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const taSystoleConcept = "5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const taDiastoleConcept = "5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const tempConcept = "5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

export const facilityVisitType = "7b0f5697-27e3-40c4-8bae-f4049abfb4ed";
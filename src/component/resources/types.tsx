export enum Profiles {
  DOCTOR = "doctor",
  NURSE = "nurse",
  ADMIN = "admin",
  ARCHIVIST = "archivist",
}

export interface User {
  display: string;
  link: Array<string>;
  person: any;
  priviliges: any;
  resourceVersion: any;
  roles: Array<any>;
  userProperties: any;
  username: string;
  uuid: string;
}

interface NameValue {
  uuid?: string;
  preferred?: boolean;
  givenName: string;
  familyName: string;
}

export type Person = {
  uuid?: string;
  names: Array<NameValue>;
  gender: string;
  birthdate?: string;
  birthdateEstimated?: boolean;
  attributes?: Array<AttributeValue>;
  addresses?: Array<Address>;
  dead?: boolean;
  deathDate?: string;
  causeOfDeath?: string;
  age?: number;
};

export interface AttributeValue {
  attributeType: string | any;
  value: string;
  uuid?: string;
}

export interface PatientIdentifier {
  uuid?: string;
  identifier: string;
  identifierType: string | any;
  location?: string;
  preferred?: boolean;
}


export type relationshipType = {
  givenName: string;
  familyName: string;
  contactPhone: string;
  type: string;
  personUuid?: string;
  relationUuid?: string;
}

export type Relationships = {
  uuid?: string;
  relationshipType: string;
  personA: string | Person;
  personB: string | relationshipType;
};

export type Address = {
  address1?: string,
  cityVillage: string,
  stateProvince: string,
  country: string,
  display?: string,
}
export interface Concept {
  uuid: string;
  display?: string;
  answers?: Concept[];
  answer?: string;
}

export type Patient = {
  uuid?: string;
  identifiers: Array<PatientIdentifier>;
  person: Person;
  voided?: boolean;
}

export type Obs = {
  uuid?: string;
  person?: Person | string;
  obsDatetime?: string;
  encounter?: Encounter | string;
  location?: string;
  question?: string ;
  answers?: string | Object | any[];
}

export type Encounter = {
  patient?: string;
  encounterDatetime?: string;
  encounterType: string;
  location?: string;
  uuid?: string;
  displays?: string;
  obs?: Concept[];
}

export interface ConceptResponse {
  uuid: string;
  display: string;
  answers: Array<ConceptAnswers>;
}

export interface ConceptAnswers {
  display: string;
  uuid: string;
}

export interface IdentifierSource {
  uuid: string;
  name: string;
  description?: string;
}
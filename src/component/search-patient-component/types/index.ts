export interface Patient {
  id: String;
  identify: String;
  No_dossier: String;
  firstName: String;
  lastName: String;
  birth: string;
  residence: String;
  habitat: String;
  phoneNumber: String;
  gender: String;
  dead: boolean;
  valided: boolean;
  matrimonial: String;
  occupation: String;
  birthplace: String;
  relationship: any;
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
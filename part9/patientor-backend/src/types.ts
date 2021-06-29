export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn: string;
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export type PatientNonSensitive = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
};

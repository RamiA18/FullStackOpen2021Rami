export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn: string;
  entries: Entry[];
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type PatientNonSensitive = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
};

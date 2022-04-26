import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients.json";
// import { PatientNonSensitive, NewPatient, Patient } from "../types";
import { Patient, PublicPatient, NewPatient } from '../types';


const patients: Array<Patient> = patientsData as Patient[];

const getPatients = (): Array<Patient> => {
  return patients;
};

// const getNonSensitivePatient = (): PatientNonSensitive[] => {
  const getPublicPatient = (): PublicPatient [] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }));
  };

const addNewPatient = (patientToAdd: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientToAdd,
  };
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

export default { getPublicPatient, addNewPatient, getPatients, findById };

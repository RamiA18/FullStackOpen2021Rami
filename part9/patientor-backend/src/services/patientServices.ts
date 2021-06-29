import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients.json";
import { PatientNonSensitive, NewPatient, Patient } from "../types";

const patients: Array<Patient> = patientsData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const addNewPatient = (patientToAdd: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientToAdd,
  };
  patients.push(newPatient);
  return newPatient;
};

const getNonSensitivePatient = (): PatientNonSensitive[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getNonSensitivePatient, addNewPatient, getPatients };

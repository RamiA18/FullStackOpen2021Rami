import { NewPatient, Gender, Fields } from "./types";

const parseGender = (gender: unknown): Gender => {
  const checkGender: boolean = typeof gender === "string";
  if (gender === "male" && checkGender) {
    return Gender.male;
  }

  if (gender === "female" && checkGender) {
    return Gender.female;
  }

  if (gender === "other" && checkGender) {
    return Gender.other;
  }
  throw new Error("Gender selection was invlid");
};

const checkString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (entry: unknown): string => {
  if (!entry || !checkString(entry)) {
    throw new Error("invalid Entry");
  }
  return entry;
};

const checkDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !checkString(date) || !checkDate(date)) {
    throw new Error("Invalid date entry");
  }
  return date;
};

const setNewPatient = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    ssn: parseString(ssn),
  };

  return newEntry;
};

export default setNewPatient;

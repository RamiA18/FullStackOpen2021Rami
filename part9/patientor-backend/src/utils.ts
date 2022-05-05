import {
  NewPatient,
  Gender,
  NewEntry,
  NewPatientFileds,
  EntryFormValues,
} from "./types";

const checkString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const checkDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !checkString(date) || !checkDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!name || !checkString(name)) {
    throw new Error("Incorrect or missing name:" + name);
  }
  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !checkString(ssn)) {
    throw new Error("Incorrect or missing SSN:" + ssn);
  }
  return ssn;
};

const checkGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !checkGender(gender)) {
    throw new Error("Incorrect or missing Gender:" + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !checkString(occupation)) {
    throw new Error("Incorrect or missing Occupation:" + occupation);
  }
  return occupation;
};

const parseGenericString = (value: unknown, label: string): string => {
  if (!value || !checkString(value)) {
    throw new Error("Incorrect or missing" + label + " " + value);
  }
  return value;
};

const parseGenericNumber = (value: unknown): number => {
  return Number(value);
};

const parseGenericArrayOfStrings = (
  value: unknown,
  label: string
): string[] => {
  if (!Array.isArray(value) || !value) {
    throw new Error("Incorrect or missing" + label + " " + value);
  }

  value.filter((x) => checkString(x));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return value;
};

const setNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: NewPatientFileds): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  return newPatient;
};

const setNewEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  employerName,
  discharge,
  sickleave,
  healthCheckRating,
}: EntryFormValues): NewEntry => {
  switch (type) {
    case "OccupationalHealthcare":
      const entrOccup = {
        description: parseGenericString(description, "description"),
        date: parseDate(date),
        specialist: parseGenericString(specialist, "specialist"),
        diagnosisCodes: parseGenericArrayOfStrings(
          diagnosisCodes,
          "diag codes"
        ),
        type: "OccupationalHealthcare" as const,
        employerName: parseGenericString(employerName, "employer name"),
        sickLeave: {
          startDate: parseDate(sickleave.startDate),
          endDate: parseDate(sickleave.endDate),
        },
        healthCheckRating: parseGenericNumber(healthCheckRating),
      };
      return entrOccup;
    case "Hospital":
      const entrHos = {
        description: parseGenericString(description, "description"),
        date: parseDate(date),
        specialist: parseGenericString(specialist, "specialist"),
        diagnosisCodes: parseGenericArrayOfStrings(
          diagnosisCodes,
          "diag codes"
        ),
        type: "Hospital" as const,
        discharge: {
          date: parseDate(discharge.date),
          criteria: parseGenericString(discharge.criteria, "criteria"),
        },
      };
      return entrHos;
    case "HealthCheck":
      const entrCheck = {
        description: parseGenericString(description, "description"),
        date: parseDate(date),
        specialist: parseGenericString(specialist, "specialist"),
        diagnosisCodes: parseGenericArrayOfStrings(
          diagnosisCodes,
          "diag codes"
        ),
        type: "HealthCheck" as const,
        healthCheckRating: parseGenericNumber(healthCheckRating),
      };
      return entrCheck;
    default:
      throw Error;
  }
};

export default { setNewPatient, setNewEntry };

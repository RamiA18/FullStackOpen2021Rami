"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const parseGender = (gender) => {
    const checkGender = typeof gender === "string";
    if (gender === "male" && checkGender) {
        return types_1.Gender.male;
    }
    if (gender === "female" && checkGender) {
        return types_1.Gender.female;
    }
    if (gender === "other" && checkGender) {
        return types_1.Gender.other;
    }
    throw new Error("Gender selection was invlid");
};
const checkString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseString = (entry) => {
    if (!entry || !checkString(entry)) {
        throw new Error("invalid Entry");
    }
    return entry;
};
const checkDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !checkString(date) || !checkDate(date)) {
        throw new Error("Invalid date entry");
    }
    return date;
};
const setNewPatient = ({ name, dateOfBirth, gender, occupation, ssn, }) => {
    const newEntry = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        ssn: parseString(ssn),
    };
    return newEntry;
};
exports.default = setNewPatient;

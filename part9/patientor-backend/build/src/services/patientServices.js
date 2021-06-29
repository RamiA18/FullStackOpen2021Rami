"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const patients = patients_json_1.default;
const getPatients = () => {
    return patients;
};
const addNewPatient = (patientToAdd) => {
    const newPatient = Object.assign({ id: uuid_1.v1() }, patientToAdd);
    patients.push(newPatient);
    return newPatient;
};
const getNonSensitivePatient = () => {
    return patients_json_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
exports.default = { getNonSensitivePatient, addNewPatient, getPatients };

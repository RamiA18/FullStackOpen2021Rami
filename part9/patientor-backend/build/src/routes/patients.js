"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientServices_1 = __importDefault(require("../services/patientServices"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    try {
        res.send(patientServices_1.default.getNonSensitivePatient());
        console.log("Successfully obtained non-sensitive patients' data");
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});
router.post("/", (req, res) => {
    try {
        const newPatient = utils_1.default(req.body);
        const newPatientEntry = patientServices_1.default.addNewPatient(newPatient);
        res.json(newPatientEntry);
        console.log("New patient has been added");
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});
exports.default = router;

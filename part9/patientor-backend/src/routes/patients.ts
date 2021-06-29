import express from "express";
import patientServices from "../services/patientServices";
import setNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  try {
    res.send(patientServices.getNonSensitivePatient());
    console.log("Successfully obtained non-sensitive patients' data");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = setNewPatient(req.body);
    const newPatientEntry = patientServices.addNewPatient(newPatient);
    res.json(newPatientEntry);
    console.log("New patient has been added");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

export default router;

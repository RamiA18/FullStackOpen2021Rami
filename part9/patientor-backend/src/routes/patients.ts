import express from "express";
import patientService from "../services/patientServices";
import utils from "../utils";
import { NonSensitivePatient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: Array<NonSensitivePatient> =
    patientService.getNonSensitivePatientsData();
  res.json(data);
});

router.get("/:id", (req, res) => {
  try {
    const data: NonSensitivePatient = patientService.getNonSensitivePatientData(
      req.params.id
    );
    res.json(data);
  } catch (error) {
    res.status(404).send("Patient was not found");
  }
});

router.post("/", (req, res) => {
  const newPatient = utils.setNewPatient(req.body);
  const createdPatient = patientService.addPatientData(newPatient);
  res.send(createdPatient);
});

router.post("/:id", (req, res) => {
  const newEntry = utils.setNewEntry(req.body);
  const updatedPatient = patientService.addEntry(req.params.id, newEntry);

  res.json(updatedPatient);
});

export default router;

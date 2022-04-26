import express from "express";
import patientServices from "../services/patientServices";
import setNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  try {
    res.send(patientServices.getPublicPatient());
    console.log("Successfully obtained Public data");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

// for tutorial purposes
router.get("/all", (_req, res) => {
  try {
    res.send(patientServices.getPatients());
    console.log("Successfully obtained All data");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

router.get('/:id', (req, res) => {
  try {
    res.send(patientServices.findById(req.params.id));
    console.log("Successfully obtained data by ID")
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

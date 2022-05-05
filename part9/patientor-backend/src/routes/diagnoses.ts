import express from "express";
import diagnosesService from "../services/diagnoseServices";
import { Diagnose } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: Array<Diagnose> = diagnosesService.getDiagnosisData();
  res.json(data);
});

router.post("/", (_req, res) => {
  res.status(200).send("Saving diagnose");
});

export default router;

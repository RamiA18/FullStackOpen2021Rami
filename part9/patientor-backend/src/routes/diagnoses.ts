import express from "express";
import diagnoseService from "../services/diagnoseServices";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnoseService.fetchDiagnoses());
  console.log("Diagnoses has been successfully fetched");
});

export default router;

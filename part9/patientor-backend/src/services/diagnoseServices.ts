import diagnoseData from "../../data/diagnoses.json";
import { Diagnose } from "../types";

const diagnoses: Array<Diagnose> = diagnoseData;

const fetchDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  fetchDiagnoses,
};

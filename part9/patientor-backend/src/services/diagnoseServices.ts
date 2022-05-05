import diagnosisData from "../../data/diagnosis";
import { Diagnose } from "../types";

const getDiagnosisData = (): Array<Diagnose> => {
  return diagnosisData;
};

const addDiagnosisData = () => {
  return null;
};

export default { getDiagnosisData, addDiagnosisData };

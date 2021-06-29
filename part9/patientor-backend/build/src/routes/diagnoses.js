"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoseServices_1 = __importDefault(require("../services/diagnoseServices"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(diagnoseServices_1.default.fetchDiagnoses());
    console.log("Diagnoses has been successfully fetched");
});
exports.default = router;

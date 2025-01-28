import express from "express";
import { certificateInfo, createCert } from "../controllers/cert"

const router = express.Router();

router
  .get("/:certificate", certificateInfo)
  .post("/create-cert", createCert);
  
export default router;
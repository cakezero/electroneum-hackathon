import express from "express";
import { creatorRegister, dashboard, creatorLogin } from "../controllers/creator"; 

const router = express.Router();

router
  .get("/dashboard", dashboard)
  .post("/create-creator", creatorRegister)
  .post("/login", creatorLogin)

export default router;

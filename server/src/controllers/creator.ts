import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import certOwner from "../models/certOwner";
import logger from "../configs/logger";
import httpStatus from "http-status"

const creatorRegister = async (req: Request, res: Response) => { 
  try {
    const { email, username, password } = req.body;
    const emailExists = await certOwner.findOne({ email });
    if (emailExists) { 
      res.status(httpStatus.FOUND).json({ error: "Email already exists" });
      return;
    }
    
    const usernameExists = await certOwner.findOne({ username });
    if (usernameExists) {
      res.status(httpStatus.FOUND).json({ error: "Username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hash(password, salt);

    req.body.password = hashedPassword;

    const newCreator = new certOwner(req.body);
    newCreator.save();
    res.status(httpStatus.CREATED).json({ message: "Creator registered", userInfo: newCreator });
  } catch (error: any) {
    logger.error(`Error creating creator: ${error.message}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
}

const creatorLogin = async (req: Request, res: Response) => { 
  try {
    const { auth, password } = req.body;

    const userExists = await certOwner.findOne({ $or: [{ email: auth }, { username: auth }] });
    if (!userExists) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid credentials or User does not exists" });
      return;
    }
    const passwordCheck = await bcrypt.compare(password, userExists.password);
    if (!passwordCheck) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid credentials or User does not exists" });
      return;
    }
    res.status(httpStatus.OK).json({ message: "User has been logged in", userInfo: userExists });
  } catch (error: any) {
    logger.error(`Error loggin user in: ${error.message}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
}

const dashboard = async (req: Request, res: Response) => { 
  try {
    
  } catch (error: any) {
    logger.error(`Error getting dashboard info: ${error.message}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
}

export { dashboard, creatorRegister, creatorLogin };
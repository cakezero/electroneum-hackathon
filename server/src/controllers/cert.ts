import type { Request, Response } from "express";
import httpStatus from 'http-status';
import logger from "../configs/logger"
import certificateModel from "../models/certificateSchema";
import cryptoRandomString from "crypto-random-string";

const createCert = (req: Request, res: Response) => {
  try {
    const certUrl = cryptoRandomString({ length: 8, type: "alphanumeric" });
    req.body.certUrl = certUrl;
    const createdCertificate = new certificateModel(req.body);
    createdCertificate.save();
    res.status(httpStatus.CREATED).json({ message: "Certificate created" });
  } catch (error: any) {
    logger.error(`Error saving certificate: ${error.messag}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}

const certificateInfo = async (req: Request, res: Response) => { 
  try {
    const { certUrl } = req.query;
    const certificateInfo = await certificateModel.findOne({ certUrl });
    if (!certificateInfo) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid certificate url" })
      return;
    }
    res.status(httpStatus.OK).json({ message: "Certificate details found", certificateInfo })
  } catch (error: any) {
    logger.error(`Error fetching certificate information: ${error.message}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" })
  }
}

const mintedCert = async (req: Request, res: Response) => {
 try {
    const { certUrl, minter } = req.query;
    const certCheck = await certificateModel.findOne({ certUrl });
    if (!certUrl) {
      res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid certificate url" })
      return;
    }
    const { users } = certCheck!;
    for (let i = 0; i <= users.length; i++) {
      if (users[i] === minter as string) {
        res.status(httpStatus.BAD_REQUEST).json({ error: "user has already minted" });
        return;
      }
    }
    certCheck!.minted! += 1;
    certCheck!.users.push(minter as string);
    certCheck!.save();
    res.status(httpStatus.OK).json({ message: "Minted info saved" });
 } catch (error: any) {
    logger.error(`Error updating minted certificates: ${error.message}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" })
 } 
}

export { certificateInfo, createCert, mintedCert };
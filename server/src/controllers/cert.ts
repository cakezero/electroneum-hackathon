import type { Request, Response } from "express";

const createCert = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Certificate created" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

const certificateInfo = async (req: Request, res: Response) => { 
  try {
    
  } catch (error: any) {
    
  }
}

export { certificateInfo, createCert };
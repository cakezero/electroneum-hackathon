import type { Request } from "express";
import nodemailer from "nodemailer"

export interface CustomRequest extends Request { 
  user?: object | string
}

export type User = {
  email: String | undefined,
  walletAddress: String | undefined,
}

export interface MailOptions extends nodemailer.SendMailOptions {
  template?: string;
  context?: {
    [key: string]: any;
  };
}

export interface emailUser {
  username: string;
  email: string;
  certUrl?: string;
}
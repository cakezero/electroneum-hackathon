import type { Request } from "express";

export interface CustomRequest extends Request { 
  user?: object | string
}

export type User = {
  email: String,
  walletAddress: String
}
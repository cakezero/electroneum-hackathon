import nodemailer from "nodemailer";
import hbs, { type NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import logger from "../configs/logger";
import { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD } from "./env";
import type { emailUser, MailOptions } from "../types/types";

const __dirname = dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
});

const options: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, "../utils/templates"),
    defaultLayout: false
  },
  viewPath: path.resolve(__dirname, "../utils/templates")
};

transporter.use("compile", hbs(options));


const sendRegisterEmail = async (user: emailUser, subject: string) => {
  try {
    transporter.sendMail({
      from: EMAIL_USER,
      to: user.email,
      subject: subject,
      template: "register",
      context: {
        username: user.username
      }
    } as MailOptions);
  } catch (error: any) {
    logger.error(`Error sending register email: ${error.message}`)
    throw new Error("Error sending Register mail");
  }
};

const sendLoginEmail = (user: emailUser, subject: string) => {
  try {
    transporter.sendMail({
      from: EMAIL_USER,
      to: user.email,
      template: "login",
      subject: subject,
      context: {
        username: user.username
      }
    } as MailOptions)
  } catch (error: any) {
    logger.error(`Error sending login email: ${error.message}`);
    throw new Error("Error sending Login mail");
  }
};

const sendMintEmail = (user: emailUser, subject: string) => {
  try {
    transporter.sendMail({
      from: EMAIL_USER,
      to: user.email,
      template: "mint",
      subject: subject,
      context: {
        username: user.username,
      },
    } as MailOptions);
  } catch (error: any) {
    logger.error(`Error sending mint email: ${error.message}`);
    throw new Error("Error sending Mint mail");
  }
};

const sendCreateCertificateEmail = (user: emailUser, subject: string) => {
  try {
    transporter.sendMail({
      from: EMAIL_USER,
      to: user.email,
      template: "createCert",
      subject: subject,
      context: {
        username: user.username,
        mintUrl: user.certUrl
      }
    } as MailOptions);
  } catch (error: any) {
    logger.error(`Error sending createCert email: ${error.message}`);
    throw new Error("Error sending certificate created mail");
  }
};

export { sendRegisterEmail, sendLoginEmail, sendMintEmail, sendCreateCertificateEmail };

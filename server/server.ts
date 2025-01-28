import express from "express"
import cors from "cors"
import connectDB from "./src/configs/db";
import logger from "./src/configs/logger"
import certRoutes from "./src/routes/certRoutes"
import creatorRoutes from "./src/routes/creatorRoutes";
import { PORT } from "./src/utils/env"

const server = express();

server.use(cors());
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

server.use("/certificates", certRoutes);
server.use("/creator", creatorRoutes);

server.listen(PORT, () => {
  connectDB();
  logger.info(`Server is running on port ${PORT}`);
});
import { Router } from "express";
import logger from "../loggers/logger.js";
const info = Router();

import informacion from "../utils/info.js";

info.get("/", (req, res) => {
    
    res.send(informacion);
  
});

export default info;
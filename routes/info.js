import { Router } from "express";
const info = Router();

import informacion from "../utils/info.js";

info.get("/", (req, res) => {
  
    res.send(informacion);
  
});

export default info;
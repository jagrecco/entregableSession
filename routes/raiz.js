import { Router } from "express";
const raiz = Router();

raiz.get("/", (req, res) => {
  
    res.render('index.html', {productos});

});

export default raiz;
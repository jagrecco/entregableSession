import { Router } from "express";
const logout = Router();

logout.get("/", (req, res) => {
    const usuario=req.session.user
    req.session.destroy((err) => {
      if (!err) res.render('logout', {usuario})
      else res.send("Error");
    });
});

export default logout;
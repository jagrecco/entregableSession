import { Router } from "express";
const login = Router();

import passport from "passport";

login.post("/", passport.authenticate('local', { failureRedirect: "errorLogin.html"}), (req, res) => {
  
  /* console.log(req.body) */

  const { email } = req.body;
  
  req.session.user = email;
  res.redirect('/productos')
  
});

export default login;
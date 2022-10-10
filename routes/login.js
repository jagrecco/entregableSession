import { Router } from "express";
const login = Router();

import passport from "passport";

/* passport.authenticate("local",
  { failureRedirect: "errorLogin.html",
  successRedirect: '/productos'}), */


/* import passport from '../middleware/passport.js' */
//passport.authenticate("local", { failureRedirect: "errorLogin.html", successRedirect: '/productos' }),
login.post("/", passport.authenticate('local', { failureRedirect: "errorLogin.html"}), (req, res) => { //
  
  console.log(req.body)

  const { email, password } = req.body;
  
  req.session.user = email;
  res.redirect('/productos')
  
});

export default login;
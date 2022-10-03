import { Router } from "express";
const register = Router();

import User from "../models/User.js";
import bcrypt from "bcrypt";


register.get('/', (req, res)=>{
  
  res.render("register");

})

register.post('/', (req, res)=>{
  
  const { email, username, password } = req.body;
  
  User.findOne({ "email" : req.body.email }, async (err, user) => {
    if (err) {
      console.log(err)
      res.render('errorRegistro');
    };
    if (user) {
      console.log(`El usuario ya existe ${user}`)
      res.render('errorRegistro');
    }
    
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.redirect("/");
    }
  
});
})

export default register;
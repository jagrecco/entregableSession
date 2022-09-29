import User from "../models/User.js";
import info from "../utils/info.js"
import bcrypt from "bcrypt";
import passport from "passport";
import generaObjeto from '../utils/calculo.js'
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;

import { Router } from "express";
const ruta = Router();

/* ruta.use(passport.initialize());
ruta.use(passport.session()); */

passport.use(
  new LocalStrategy((mail, password, done) => {
    User.findOne({ mail }, (err, mail) => {
      if (err) console.log(err);
      if (!mail) {
        console.log(mail)
        return done(null, false)
      };
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) console.log(err);
        if (isMatch) return done(null, user);
        return done(null, false);
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

/* import mongoose from "mongoose"; */

/* import { config } from 'dotenv';
config()
const mongoUsuario=process.env.MONGOUSER

mongoose
  .connect(mongoUsuario)
  .then(() => console.log(`${mongoUsuario} connectada`))
  .catch((err) => console.log(err)); */



import {persiste, leedata} from '../utils/util.js'
const productos=leedata('./data/prod2.json')
import prodsFake from "../utils/productosFake.js";


ruta.post("/login", passport.authenticate("local", { failureRedirect: "index.html" }), (req, res) => {
  
  const { mail, password } = req.body;
    
  req.session.user = mail;
  res.redirect('/productos')
  
});

ruta.get("/logout", (req, res) => {
  const usuario=req.session.user
  req.session.destroy((err) => {
    if (!err) res.render('logout', {usuario})
    else res.send("Error");
  });
});

ruta.get("/", (req, res) => {
  
  res.render('index.html', {productos});

});

ruta.get('/productos', (req, res) => {
  const usuario=req.session.user
  
  if (!usuario) {return res.redirect('/')}
  res.render('index', {productos, usuario});

})

ruta.get('/api/productos-test', (req, res)=>{
  
  res.render('tablaFake', {prodsFake})
  
})

ruta.post('/productos', (req, res) => {
  productos.push(req.body)

})

ruta.get("/register", (req, res) => {
  res.render("register");
});

ruta.post("/register", (req, res) => {
  const { mail, password } = req.body;
  User.findOne({ mail }, async (err, user) => {
    if (err) {
      console.log(err)
      res.render('errorRegistro');
    };
    if (user) {
      res.render('errorRegistro');
    }
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        mail,
        password: hashedPassword,
      });
      await newUser.save();
      res.redirect("/");
    }
  });

});

ruta.get("/info", (req, res)=>{
  res.send(info)
})

ruta.get("/api/random", async (req, res)=>{
  const resRandom =  generaObjeto(parseInt(req.query.cant))
  console.log("Listo : " + resRandom)
  res.send(resRandom)
})

export default ruta;
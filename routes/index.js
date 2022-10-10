//import User from "../models/User.js";
/* import info from "../utils/info.js" */
//import bcrypt from "bcrypt";
//import passport from "passport";
/* import { fork } from 'child_process'; */

import { Strategy } from "passport-local";
const LocalStrategy = Strategy;
import express from 'express'
/* import { Router } from "express"; */
const ruta = express.Router();

import raiz from './raiz.js';
import info from './info.js';
import productosTest from './productosTest.js';
import logout from './logout.js';
import login from './login.js';
import product from './productos.js';
import register from './register.js'
import apiRandom from './apiRandom.js'
/* ruta.use(passport.initialize());
ruta.use(passport.session()); */

ruta.use('/info', info);
ruta.use("/", raiz);
ruta.use("/login", login);
ruta.use("/logout", logout);
ruta.use('/api/productos-test', productosTest);
ruta.use('/productos', product);
ruta.use('/register', register);
ruta.use('/api/random', apiRandom);


/* passport.use(
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
 */
/* import mongoose from "mongoose"; */

/* import { config } from 'dotenv';
config()
const mongoUsuario=process.env.MONGOUSER

mongoose
  .connect(mongoUsuario)
  .then(() => console.log(`${mongoUsuario} connectada`))
  .catch((err) => console.log(err)); */



/* import {persiste, leedata} from '../utils/util.js'
const productos=leedata('./data/prod2.json') */
/* import prodsFake from "../utils/productosFake.js"; */



/* ruta.get("/", (req, res) => {
  
  res.render('index.html', {productos});

}); */

/* ruta.post("/login", passport.authenticate("local", { failureRedirect: "index.html" }), (req, res) => {
  
  const { mail, password } = req.body;
    
  req.session.user = mail;
  res.redirect('/productos')
  
}); */


/* ruta.get("/logout", (req, res) => {
  const usuario=req.session.user
  req.session.destroy((err) => {
    if (!err) res.render('logout', {usuario})
    else res.send("Error");
  });
}); */


/* ruta.get('/productos', (req, res) => {

  const usuario=req.session.user
  
  if (!usuario) {return res.redirect('/')}
  res.render('index', {productos, usuario});

}) */

/* ruta.get('/api/productos-test', (req, res)=>{
  
  res.render('tablaFake', {prodsFake})
  
}) */

/* ruta.post('/productos', (req, res) => {
  
  productos.push(req.body)

}) */

/* ruta.get("/register", (req, res) => {
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

}); */

/* ruta.get("/info", (req, res)=>{
  res.send(info)
}) */

/* ruta.get("/api/random", (req, res)=>{

  const forked = fork('./utils/calculoForked.js')
  const cantidad=parseInt(req.query.cant)

  forked.on('message', msg => {
     if (msg == 'listo') {
         forked.send(cantidad)
     } else {
         
         res.send(JSON.parse(msg))
     }
  })

})
 */
export default ruta;
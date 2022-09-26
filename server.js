import express from 'express'
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
/* import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy; */
import User from "./models/User.js";
import bcrypt from "bcrypt";

import {persiste, leedata} from './utils/util.js'
import ruta from "./routes/index.js";

import { config } from 'dotenv';
config()

const port = process.env.PORT || 8080
const mongoSesion= process.env.MONGOSESION
const mongoUsuario=process.env.MONGOUSER

mongoose
  .connect(mongoUsuario)
  .then(() => console.log(`${mongoUsuario} connectada`))
  .catch((err) => console.log(err));


let productos=[]
let mensajes=[]

leedata('./data/prod2.json').then((result) => {productos=result})
leedata('./data/mensajes.json').then((result) => {mensajes=result})

const app = express();
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer);

app.set('views', './public');
app.set('view engine', 'ejs');

app.set('json spaces', 2)

//middleware
app.use(express.static("./public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({ mongoUrl: mongoSesion }),

    secret: "miPropiaSession",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
  );

app.use(passport.initialize());
app.use(passport.session())
//passport
/* app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((mail, password, done) => {
    User.findOne({ mail }, (err, user) => {
      if (err) console.log(err);
      if (!user) return done(null, false);
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
}); */

app.use("/", ruta)

httpServer.listen(port, () => console.log(`SERVER ON: Puerto ${port}`));

// Servidor
io.on("connection", (socket) => {

  console.log("¡Nuevo cliente conectado!");
  socket.emit("mensajes", mensajes);
  socket.emit("productos", productos);

  socket.on("mensaje", (data) => {
    mensajes.push(data)
    persiste('./data/mensajes.json', mensajes)
    io.sockets.emit("mensajes", mensajes);
  });

  socket.on("producto", (prod) => {
    productos.push(prod)
    io.sockets.emit("productos", productos);

  });

});

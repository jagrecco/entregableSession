import express from 'express';
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import minimist from 'minimist';

import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import compression from "compression";
import logger from "./loggers/logger.js";

import ruta from "./routes/index.js";

import './middleware/passport.js'

import {persiste, leedata} from './utils/util.js'

import { config } from 'dotenv';
config()

const args= minimist(process.argv.slice(2))
const port = args._[0] || 8080

/* const port = process.env.PORT || 8080 */
const mongoSesion= process.env.MONGOSESION
const mongoUsuario=process.env.MONGOUSER

mongoose
  .connect(mongoUsuario)
  .then(() => {
    try {
      logger.info(`${mongoUsuario} connectada`)
    } catch (error) {
      logger.error(`Erro al conectar con ${mongoUsuario}:  ${error}`)
    }
  })
  .catch((err) => console.log(err));

let productos=[]
let mensajes=[]

leedata('./data/prod2.json').then((result) => {productos=result})
leedata('./data/mensajes.json').then((result) => {mensajes=result})

// inicialización
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.set('views', './public');
app.set('view engine', 'ejs');
app.set('json spaces', 2)

//middleware
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(
  session({
    store: MongoStore.create({ mongoUrl: mongoSesion }),
    secret: "miPropiaSession",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());

//rutas
app.use("/", ruta)


httpServer.listen(port, (error) => {
  try {
    logger.info(`SERVER ON: PORT ${port}`)
  } catch (error) {
    logger.error(`ERROR AL INTENTAR LEVANTAR SERVER ON: PORT ${port}:  ${error} `)
  }
});

// Servidor socket
io.on("connection", (socket) => {

  logger.info(`¡Nuevo cliente conectado!`)
  socket.emit("mensajes", mensajes);
  socket.emit("productos", productos);

  socket.on("mensaje", (data) => {
    try {
      mensajes.push(data)
      persiste('./data/mensajes.json', mensajes)
      io.sockets.emit("mensajes", mensajes);
    } catch (error) {
      logger.error(`ERROR AL INTENTAR ENVIAR CHAT: ${data}:  ${error} `)
    }
  });

  socket.on("producto", (prod) => {
    try {
      productos.push(prod)
      io.sockets.emit("productos", productos);
    } catch (error) {
      logger.error(`ERROR AL INTENTAR ENVIAR PRODUCTO: ${prod}:  ${error} `)
    }

  });

});

import express from 'express'
const ruta = express.Router();

import raiz from './raiz.js';
import info from './info.js';
import productosTest from './productosTest.js';
import logout from './logout.js';
import login from './login.js';
import product from './productos.js';
import register from './register.js'
import apiRandom from './apiRandom.js'
import logger from '../loggers/logger.js';

ruta.use((req,res, next)=>{
    logger.info(`Pedito ${req.method} a la ruta ${req.originalUrl}`)
    /* console.log(req.method)
    console.log(req.url) */
    next()
})

ruta.use('/info', info);
ruta.use("/", raiz);
ruta.use("/login", login);
ruta.use("/logout", logout);
ruta.use('/api/productos-test', productosTest);
ruta.use('/productos', product);
ruta.use('/register', register);
ruta.use('/api/random', apiRandom);


export default ruta;
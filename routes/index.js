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

ruta.use('*',(req,res, next)=>{
    const html=`<div style='border: 1px solid black;padding: 50px; text-align:center'><h3 style="color:orangered ;">404 - Page not found!</h3> <a style="text-decoration: none; color:darkblue; font-weight: bolder; " href='http://localhost:3000/'>Ir a inicio</a></div>`
    logger.warn(`Pedito ${req.method} a una ruta inexistente: ${req.originalUrl}`)
    res.status(404).send(html);
    next()
})

export default ruta;
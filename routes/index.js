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
import log from '../utils/log.js'


ruta.use((req,res, next)=>{
    log(req.method, req.originalUrl, 200)
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

ruta.use('*', (req,res,next)=>{
    log(req.method,req.originalUrl, 404)
    const html=`<div style='border: 1px solid black;padding: 50px; text-align:center'><h3 style="color:orangered ;">404 - Page not found!</h3> <a style="text-decoration: none; color:darkblue; font-weight: bolder; " href='http://localhost:3000/'>Ir a inicio</a></div>`
    res.status(404).send(html);
    next()
})


export default ruta;
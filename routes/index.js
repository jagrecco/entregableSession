import { Router } from "express";
const ruta = Router();

import {persiste, leedata} from '../utils/util.js'
const productos=leedata('./data/prod2.json')

import prodsFake from "../utils/productosFake.js";


ruta.post("/login", (req, res) => {
  
  const { username } = req.body;
  
  if (username == '') {
    return res.redirect('/')
  }
  req.session.user = username;
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


export default ruta;
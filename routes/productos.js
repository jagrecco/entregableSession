import { Router } from "express";
const product = Router();

import {leedata} from '../utils/util.js';

const productos=leedata('./data/prod2.json');

product.get('/', (req, res)=>{
    
    const usuario=req.session.user
    if (!usuario) {return res.redirect('/')}
    res.render('index', {productos, usuario});
    
})

product.post('/', (req, res)=>{

    productos.push(req.body)

})


export default product
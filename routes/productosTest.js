import { Router } from "express";
const productosTest = Router();

import prodsFake from '../utils/productosFake.js';

productosTest.get('/', (req, res)=>{
    res.render('tablaFake', {prodsFake})
});

export default productosTest;
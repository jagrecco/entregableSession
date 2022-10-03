import { fork } from 'child_process';
import { Router } from "express";

const apiRandom = Router();

apiRandom.get('/', (req, res)=>{

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

export default apiRandom;
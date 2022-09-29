import { fork } from 'child_process';

//const cantidad=10000 // /randoms?cant=20000

const generaObjeto= await function (cantidad){
    
    const forked = fork('./utils/calculoForked.js')

    forked.on('message', msg => {
       if (msg == 'listo') {
           forked.send(cantidad)
       } else {
           console.log(`Mensaje del hijo: ${msg}`)
           return msg
       }
    })

}

export default generaObjeto


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)+1;
}

const objeto={}

process.on('message', msg => {

    const cant=parseInt(msg)

    for (let i=0;i<=cant;i++){
        /* console.log(i) */
        const numRandom=getRandom(1, 1000)
        const propiedad=numRandom.toString()
        /* console.log(numRandom)
        console.log("propiedad = " + propiedad) */
        if (objeto[propiedad]) {
            /* console.log("Lo encontré " + objeto[propiedad]) */
            let cantidad=objeto[propiedad]
            cantidad++
            objeto[propiedad]=cantidad
        } else {
            objeto[propiedad]=1
        }
    }
    /* console.log(objeto) */
    process.send(objeto)
    /* return objeto */

    process.exit()
 })
 
 process.send('listo')
 
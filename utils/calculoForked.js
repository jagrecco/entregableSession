
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)+1;
}

const objeto={}

process.on('message', msg => {

    const cant=parseInt(msg)

    for (let i=0; i<=cant; i++){
        
        const numRandom=getRandom(0, 1000)
        const propiedad=numRandom.toString()
        
        if (objeto[propiedad]) {
            let cantidad=objeto[propiedad]
            cantidad++
            objeto[propiedad]=cantidad

        } else {
            objeto[propiedad]=1
        }
    }
    
    process.send(JSON.stringify(objeto))

    process.exit()
 })
 
 process.send('listo')
 
import minimist from 'minimist'

process.argv.forEach((element,index) => {
    console.log(`${index}: ${element}`);
});
console.log(process.argv[0])
console.log(process.argv[1])

const args = minimist(['--PORT', process.argv.slice(2)]);
console.log()
/* const obj={} */

const info={}

info.argumentos= args
info.plataforma= process.platform
info.versionNode= process.version
info.rss= process.memoryUsage().rss
info.pathExec= process.argv[0]
info.processId= process.pid
info.pathPoyect= process.argv[1]

/* const obj={
    argumentos: args,
    plataforma: process.platform,
    versionNode: process.version,
    rss: process.memoryUsage().rss,
    pathExec: process.argv[0],
    processId: process.pid,
    pathPoyect: process.argv[1],

} */

/* console.log(JSON.parse(obj)) */
console.log(info)
/* console.log(`La plataforma es ${process.platform}`)
console.log(`La plataforma versión de node es ${process.version}`)
console.log(`Memoria total reservada rss ${process.memoryUsage().rss}`)
console.log(`Path de ejecución ${process.argv[0]}`)
console.log(`Process id ${process.pid}`)
console.log(`Carpeta del proyecto ${process.env.HOME}`) */

/* console.log(args); */

/* console.log(`Estoy leyendo del objeto args PORT: ${args.PORT}`) */
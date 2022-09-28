import minimist from 'minimist'

process.argv.forEach((element,index) => {
    console.log(`${index}: ${element}`);
});

const args = minimist(['--PORT', process.argv.slice(2)]);

const obj={
    argumentos: args,
    plataforma: process.platform,
    versionNode: process.version,
    rss: process.memoryUsage().rss,
    pathExec: process.argv[0],
    processId: process.pid,
    pathPoyect: process.argv[1],

}

/* console.log(JSON.parse(obj)) */
console.log(obj)
/* console.log(`La plataforma es ${process.platform}`)
console.log(`La plataforma versión de node es ${process.version}`)
console.log(`Memoria total reservada rss ${process.memoryUsage().rss}`)
console.log(`Path de ejecución ${process.argv[0]}`)
console.log(`Process id ${process.pid}`)
console.log(`Carpeta del proyecto ${process.env.HOME}`) */

/* console.log(args); */

/* console.log(`Estoy leyendo del objeto args PORT: ${args.PORT}`) */
import minimist from 'minimist'

const args= minimist(process.argv.slice(2))

const info={
    "argumentos": args,
    "plataforma": process.platform,
    "versionNode": process.version,
    "rss": process.memoryUsage().rss,
    "pathExec": process.argv[0],
    "processId": process.pid,
    "pathPoyect": process.argv[1],

}

export default info;
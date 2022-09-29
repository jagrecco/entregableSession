import minimist from 'minimist'

const args= minimist(process.argv.slice(2))

const info={}

info.argumentos= args
info.plataforma= process.platform
info.versionNode= process.version
info.rss= process.memoryUsage().rss
info.pathExec= process.argv[0]
info.processId= process.pid
info.pathPoyect= process.argv[1]


export default info;
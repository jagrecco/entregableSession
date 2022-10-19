import minimist from 'minimist'
import os from 'os';

const cpus=os.cpus().length

const args= minimist(process.argv.slice(2))

const info={}

info.argumentos= args
info.plataforma= process.platform
info.versionNode= process.version
info.rss= process.memoryUsage().rss
info.pathExec= process.argv[0]
info.processId= process.pid
info.pathPoyect= process.argv[1]
info.cantidadCPUs= cpus


export default info;
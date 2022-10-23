import logger from "../loggers/logger.js";
import { promises } from 'fs'

const persiste = async(ruta, data)=>{

  try {
      await promises.writeFile(ruta, JSON.stringify(data, null, 2))
    }
    catch(error){
      logger.error(`Problemas al acceder al archivo ${ruta} ${error}`)
    }
}

const leedata = async(ruta)=>{
  try {
    return JSON.parse(await promises.readFile(ruta,"utf-8"), null, 2);
  }
  catch (error) {
    logger.error(`Problemas al acceder al archivo ${ruta} ${error}`);
  }
}

export {persiste, leedata};
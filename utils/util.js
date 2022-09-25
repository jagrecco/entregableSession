import { promises } from 'fs'

const persiste = async(ruta, data)=>{

  try {
  
      await promises.writeFile(ruta, JSON.stringify(data, null, 2))
      
    }
    catch(error){
      console.log(`Problemas al acceder al archivo ${error}`)
    }
}

const leedata = async(ruta)=>{
  try {
    return JSON.parse(await promises.readFile(ruta,"utf-8"), null, 2);
  }
  catch (error) {
    console.log(`Problemas al acceder al archivo ${ruta} ${error}`);
  }
}

export {persiste, leedata};
import fs from 'fs'
import path from 'path'
import {config} from '../../config/config'

export const  sample=async()=>{
    const configObj = config
    configObj.enableConfig.enable=true||configObj.enableConfig.enable
    configObj.host=599||configObj.host

    const __dirname = path.resolve();
    // console.log(__dirname)
    const filePath = `${__dirname}/config/config.js`
    // console.log(filePath)
    // const jsf=JSON.stringify(configObj, null, 2)
    // console.log("jsf",jsf)
    const fileContent = `const config = ${JSON.stringify(configObj, null, 2)};\nexport { config }`
  // Write to file
try {
    await fs.writeFileSync(filePath, fileContent,"utf8");
    return
    console.log('File written successfully');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}
sample()


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
    console.log('File written successfully');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}
// sample()


// const text = `
// This is the first line.
// Here is a line with a pattern.
// Another line without the pattern.
// Pattern can be anywhere.
// `;

// const regex = /.*pattern.*/i; // Case-insensitive
// const matches = text.split('\n').filter(line => regex.test(line));
// console.log(matches)

// const filePath = '/some/directory/filename.ext';

// // Get the base name of the file (filename with extension)
// const fileNameWithExt = path.basename(filePath); // 'filename.ext'

// // Get the extension of the file
// const extName = path.extname(filePath); // '.ext'

// // Remove the extension from the filename
// const fileNameWithoutExt = fileNameWithExt.slice(2, extName.length);

// console.log(fileNameWithoutExt); // Output: 'filename'


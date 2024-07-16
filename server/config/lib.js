const bcrypt = require('bcrypt');
const saltRounds = 10;
export const generatePassword=(password)=>{
    console.log(password)
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt); 
    console.log(salt,hash)
    return hash
  }
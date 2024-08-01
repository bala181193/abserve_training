const bcrypt = require('bcrypt');
const saltRounds = 10;
export const generatePassword=(password)=>{
    console.log(password)
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt); 
    console.log(salt,hash)
    return hash
  }

  export const comparePassword = async (password, hash) => {
    try {
        console.log(password, hash)
        const checkPassword = bcrypt.compare(password, hash);
        return checkPassword
    } catch (err) {
        console.log(err)
        return false

    }
}
const {registerValidation} = require('./validation')
const bcrypt = require('bcrypt')
const User = require('../models/User')


async function register(queryParams){

    const regReq = {
        name: queryParams[0],
        email: queryParams[1],
        password: queryParams[2]
    }
    
    // validar datos antes de crear el usuario

    const {error} = registerValidation(regReq)
    if(error) return {msg: error.details[0].message}

    // checkear si el mail ya esta registrado

    const emailExist = await User.findOne({email: regReq.email})
    if(emailExist) return {msg:"That account already exists, please log in."}

    // encriptar la password

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(regReq.password, salt)

    // crear usuario

    const user = new User({
        name: regReq.name, 
        email: regReq.email,
        password: hashPassword
    })

    try{
        const savedUser = await user.save()

        return {msg: "User " + savedUser.name + " is now registered. You can now log in.",
                data: {user: user.id}}
        

    }catch(e){
        return {msg: e}
    }


}

module.exports = register
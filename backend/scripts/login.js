const {loginValidation} = require('./validation')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')

async function login(queryParams){

    const logInReq = {
        email: queryParams[0],
        password: queryParams[1]
    }
    // validar datos antes de hacer login

    const {error} = loginValidation(logInReq)
    if(error) return {msg: error.details[0].message} 

    // chequear si el mail esta registrado

    const user = await User.findOne({email: logInReq.email})
    if(!user) return {msg: "The account doesn't exist" }

    // chequear si coincide la contraseña

    const validPass = await bcrypt.compare(logInReq.password, user.password)
    if(!validPass) return {msg: "Incorrect password"}

    // crear token

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    return {
        msg: "you are now logged in",
        token: token,
        task: "login"
    }

}

module.exports = login
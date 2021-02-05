const router = require('express').Router()
const login = require('../scripts/login.js')
const register = require('../scripts/register.js')


function help() {
    return {msg: "here is your help"}}


router.post('/', async (req, res) =>{

    let query = req.body.query
    query = query.split(" ");
    let queryArray = new Array();
    for(let i = 0; i < query.length; i++){
        queryArray.push(query[i]);
    }
    cmd = queryArray[0]
    queryArray.shift();
    queryParams = queryArray


    switch (cmd) {

        case "help":
            res.send(help())
        
            break;

        case "login":
            res.send(await login(queryParams))
            break;

        case "register":
            res.send(await register(queryParams))
            break;
    

        default:
            res.send({msg: '"' + cmd + '": command not found'})
            break;
    }
})

module.exports = router
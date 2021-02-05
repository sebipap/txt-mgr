const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 5000

//Routes
const cmdRoute = require('./routes/cmd')
const userRoute = require('./routes/user')

//Connect DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('[OK] DB Conectada'))
    
// Middleware
app.use(express.json())

// Route middlewares
app.use('/cmd', cmdRoute)
app.use('/user', userRoute)



// for production use

if(process.env.NODE_ENV === 'production') {
    app.use(express.static((path.join(path.dirname(__dirname), '/build'))))
    app.get('*', (req, res) =>{
        res.sendFile (path.join(path.dirname(__dirname), '/build/index.html'))
    })
}

app.listen(PORT, () => console.log('[OK] Server en puerto' + PORT))
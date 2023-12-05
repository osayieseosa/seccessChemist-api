require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require("./config/dbConn")
const mongoose = require('mongoose')
const User = require('./models/User')

connectDB()

app.use(cors(corsOptions))

app.use(express.json())

app.use('/drugs', require('./routes/drugRoutes'))

app.use('/register', require('./routes/userRoutes'))

app.use('/login', async (req, res) => {
    const {name, password} = req.body
    if(!name, !password){
        return res.status(400).json('All fields required')
    }
    try{
        const user = await User.findOne({name: name}).lean().exec()
        if(user){
            if(user.password === password && user.name === name){
                res.status(200).json('success')
            }else{
                res.status(400).json('Incorrect name or password')
            }
        }else{
            res.status(400).json('No record exists')
        }
    }catch(err){
        consol.log(err)
    }
})

app.use('*', (req, res) => {
    res.status(404)
    if(req.accepts('json')){
        req.json({message: "404 Not Found"})
    }
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})
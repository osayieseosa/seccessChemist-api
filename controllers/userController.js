const User = require('../models/User')

const createNewUser = async (req, res) => {
    const {name, email, password} = req.body

    if(!name, !email, !password){
        return res.status(400).json({message:'All fields are required'})
    }
    try{
        const duplicate = await User.findOne({name}).lean().exec()
        if(duplicate){
            return res.status(409).json({message: 'Duplicate user found'})
        }
        const userObject = {name, email, password}
        const user = await User.create(userObject)

        if(user){
            res.status(201).json({message: `New drug ${user.name} created`})
        }else{
            res.status(400).json({message: `invalid user data received`})
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = {createNewUser}
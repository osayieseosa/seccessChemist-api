const Drug = require('../models/Drug')

const getAllDrugs = async (req, res) => {
    try{
        const drugs = await Drug.find().lean()
        if(!drugs){
            return res.status(400).json({ message: 'No drugs found'})
        }
        res.json(drugs)
    }catch (err){
        console.log(err)
    }
}

const createNewDrug = async (req, res) => {
    const {name, price, desc, location, category, comnName} = req.body

    if(!name || !price || !desc || !location || !category){
        return res.status(400).json({message:'All fields are required'})
    }
    try{
        const duplicate = await Drug.findOne({name}).lean().exec()
        if(duplicate){
            return res.status(409).json({message: 'Duplicate Drug'})
        }

        let drug
        let drugObject

        if(!comnName){
            drugObject = {name, price, desc, location, category}
            drug = await Drug.create(drugObject)
        }else{
            drugObject = {name, price, desc, location, category, comnName}
            drug = await Drug.create(drugObject)
        }

        if(drug){
            res.status(201).json({message: `New drug ${drug.name} created`})
        }else{
            res.status(400).json({message: `invalid user data received`})
        }
    }catch(err){
        console.log(err)
    }

}

const updateDrug = async (req, res) => {
    const {id ,name, price, comnName, desc, location} = req.body

    if(!id, !name, !price, !comnName, !desc, !location){
        return res.status(400).json({message: "All fields are required"})
    }

    try{
        const drug = await Drug.findById(id).exec()

        if(!drug){
            return res.status(400).json({message: 'Drug not found'})
        }

        const duplicate = await Drug.findOne({name}).lean().exec()

        if(duplicate && duplicate?._id.toString() !== id){
            return res.status(409).json({message: 'Duplicate Drug found'})
        }

        drug.name = name
        drug.price = price
        drug.comnName = comnName
        drug.desc = desc
        drug.location = location

        const updatedDrug = await drug.save()

        res.json({message: `${updatedDrug.name} updated`})
    }catch(err){
        console.log(err)
    }
}

const deleteDrug = async (req, res) => {
    const {id} = req.body

    if(!id){
        return res.status(400).json({message:'All fields are required'})
    }

    try{
        const drug = await Drug.findById(id).exec()

        if(!drug){
            return res.status(404).json({message:'Drug not found'})
        }
    
        await drug.deleteOne()

        const reply = `drug deleted`
       
        res.json(reply)
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getAllDrugs,
    createNewDrug,
    updateDrug,
    deleteDrug
}
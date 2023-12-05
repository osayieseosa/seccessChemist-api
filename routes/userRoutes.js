const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.route('/')
    // .get(userController.getAllDrugs)
    .post(userController.createNewUser)
    // .patch(userController.updateDrug)
    // .delete(userController.deleteDrug)

module.exports = router
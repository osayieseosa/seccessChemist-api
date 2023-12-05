const express = require('express')
const router = express.Router()
const drugController = require('../controllers/drugController')

router.route('/')
    .get(drugController.getAllDrugs)
    .post(drugController.createNewDrug)
    .patch(drugController.updateDrug)
    .delete(drugController.deleteDrug)

module.exports = router
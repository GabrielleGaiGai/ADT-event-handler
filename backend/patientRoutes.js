const express = require('express')
const router = express.Router()
const patientController = require('./patientController')

router.route('/')
    .get(patientController.getAllPatients)
    .post(patientController.addPatient)
    .patch(patientController.updatePatient)

module.exports = router
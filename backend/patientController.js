const fs = require("fs")
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')

const getAllPatients = asyncHandler(async (req, res) => {
    fs.readFile("./patients.json", (error, data) => {
        if (error) {
            return res.status(400).json({ message: error })
        }

        const patients = JSON.parse(data).patients;
        res.json(patients)
    })
})

const addPatient = asyncHandler(async (req, res) => {
    const { firstName, lastName, dateOfBirth, gender, admissionDate, dischargeDate, currentBed } = req.body
    const patientId = uuidv4()
    const patient = { patientId, firstName, lastName, dateOfBirth, gender, admissionDate, dischargeDate, currentBed }

    fs.readFile("./patients.json", (error, data) => {
        if (error) {
            return res.status(400).json({ message: error })
        }
        const patients = [...JSON.parse(data).patients, patient];

        fs.writeFile("./patients.json", JSON.stringify({ patients }), (error) => {
            if (error) {
                return res.status(400).json({ message: error })
            }
            res.json(patient)
        })
    })
})

const updatePatient = asyncHandler(async (req, res) => {
    const { patientId, firstName, lastName, dateOfBirth, gender, admissionDate, dischargeDate, currentBed } = req.body

    fs.readFile("./patients.json", (error, data) => {
        if (error) {
            return res.status(400).json({ message: error })
        }
        const patients = JSON.parse(data).patients;

        const targetPatient = patients.find((patient) => patientId == patient.patientId)
        if (!targetPatient) {
            return res.status(404).json({ message: "Patient not found" })
        }

        targetPatient.firstName = firstName
        targetPatient.lastName = lastName
        targetPatient.dateOfBirth = dateOfBirth
        targetPatient.gender = gender
        targetPatient.admissionDate = admissionDate
        targetPatient.dischargeDate = dischargeDate
        targetPatient.currentBed = currentBed

        fs.writeFile("./patients.json", JSON.stringify({ patients }), (error) => {
            if (error) {
                return res.status(400).json({ message: error })
            }
            res.json(targetPatient)
        })
    })
})

module.exports = { getAllPatients, addPatient, updatePatient }
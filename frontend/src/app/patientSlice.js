import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import dayjs from "dayjs";
const fs = require("fs");

fs.readFile("./patients.json", (error, data) => {
    if (error) {
        console.error(error)
        throw error
    }
    console.log(JSON.parse(data))
});

const patientData = require('./patients.json');
console.log(typeof patientData)


const patientsAdapter = createEntityAdapter({
    selectId: (patient) => patient.patientId,
    sortComparer: (a, b) => {
        if (!a.dischargeDate || (a.dischargeDate && b.dischargeDate && dayjs(a.dischargeDate).isAfter(dayjs(b.dischargeDate)))) {
            return -1
        } else if (!b.dischargeDate || (a.dischargeDate && b.dischargeDate && dayjs(b.dischargeDate).isAfter(dayjs(a.dischargeDate)))) {
            return 1
        } else {
            return 0
        }
    }
}
)


const bedList = patientData.patients.map((patient) => patient.currentBed)
const preLoadedState = patientsAdapter.setAll(patientsAdapter.getInitialState({ bedList }), patientData.patients)

export const patientSlice = createSlice({
    name: 'patient',
    initialState: preLoadedState,
    reducers: {
        PatientAdded(state, action) {
            patientsAdapter.addOne(state, action.payload)
        }
    }
})

export default patientSlice.reducer

export const { PatientAdded } = patientSlice.actions

export const {
    selectById: selectPatientById,
    selectIds: selectAllPatientIds,
} = patientsAdapter.getSelectors(state => state.patient)

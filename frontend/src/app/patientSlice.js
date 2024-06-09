import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import dayjs from "dayjs";

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
})


export const patientSlice = createSlice({
    name: 'patient',
    initialState: patientsAdapter.getInitialState({ bedList: [] }),
    reducers: {
        AddPatient(state, action) {
            patientsAdapter.addOne(state, action.payload)
            state.bedList.push(action.payload)
        },
        SetPatients(state, action) {
            const patientData = action.payload
            patientsAdapter.setAll(state, patientData)
            const bedList = patientData.map((patient) => patient.currentBed)
            state.bedList = bedList
        }
    }
})

export default patientSlice.reducer

export const { AddPatient, SetPatients } = patientSlice.actions

export const {
    selectById: selectPatientById,
    selectIds: selectAllPatientIds,
} = patientsAdapter.getSelectors(state => state.patient)

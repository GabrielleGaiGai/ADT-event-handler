import { createSlice, createEntityAdapter, current } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const patientsAdapter = createEntityAdapter({
    selectId: (patient) => patient.patientId,
    sortComparer: (a, b) => {
        if (!a.dischargeDate && !b.dischargeDate) {
            return a.currentBed.localeCompare(b.currentBed)
        }
        else if (!a.dischargeDate || (a.dischargeDate && b.dischargeDate && dayjs(a.dischargeDate).isAfter(dayjs(b.dischargeDate)))) {
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
            state.bedList.push(action.payload.currentBed)
        },
        SetPatients(state, action) {
            const patientsData = action.payload
            patientsAdapter.setAll(state, patientsData)
            const bedList = patientsData.map((patient) => patient.currentBed)
            state.bedList = bedList

        },
        UpdatePatient(state, action) {
            const oldPatientDate = current(state).entities[action.payload.patientId]
            state.bedList = state.bedList.filter((bed) => bed !== oldPatientDate.currentBed)
            state.bedList.push(action.payload.currentBed)
            patientsAdapter.upsertOne(state, action.payload)
        }
    }
})

export default patientSlice.reducer

export const { AddPatient, SetPatients, UpdatePatient } = patientSlice.actions

export const selectAllBeds = (state) => state.patient.bedList

export const {
    selectById: selectPatientById,
    selectIds: selectAllPatientIds
} = patientsAdapter.getSelectors(state => state.patient)

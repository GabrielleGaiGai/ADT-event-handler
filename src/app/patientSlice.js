import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import dayjs from "dayjs";


const patientsAdapter = createEntityAdapter({
    selectId: (patient) => patient.patientId,
    sortComparer: (a, b) => {
        if (!a.dischargeDate || (a.dischargeDate && b.dischargeDate && dayjs(a.dischargeDate).isAfter(dayjs(b.dischargeDate)))) {
            return 1
        } else if (!b.dischargeDate || (a.dischargeDate && b.dischargeDate && dayjs(b.dischargeDate).isAfter(dayjs(a.dischargeDate)))) {
            return -1
        } else {
            return 0
        }
    }
}
)

const patientData = require('./patients.json');
const preLoadedState = patientsAdapter.setAll(patientsAdapter.getInitialState(), patientData.patients)

export const patientSlice = createSlice({
    name: 'patient',
    initialState: preLoadedState,
    reducers: {
        PatientAdded(state, action) {
            state.push(action.payload)
        }
    }
})

export default patientSlice.reducer

export const {
    selectById: selectPatientById,
    selectIds: selectAllPatientIds,
} = patientsAdapter.getSelectors(state => state.patient)

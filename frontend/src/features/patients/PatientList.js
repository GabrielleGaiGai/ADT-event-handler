import axios from 'axios';
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from 'react-redux';

import { selectAllPatientIds, SetPatients } from "../../app/patientSlice"
import PatientRow from "./PatientRow"

const PatientList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('http://localhost:3500/patients')
            .then(res => {
                const patientsData = res.data;
                dispatch(SetPatients(patientsData))
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const patientIds = useSelector((state) => selectAllPatientIds(state))

    const header_attributes = ["First Name", "Last Name", "Gender", "Status", "Current Bed", "Discharge Date", ""]
    const header = header_attributes.map((attr) =>
        <th key={attr} className="px-5 py-3 font-bold text-gray-600 uppercase tracking-wider">
            {attr}
        </th>
    )

    const patient_list = patientIds.map(patientId => <PatientRow key={patientId} patientId={patientId} />)

    return (
        <div className="grid grid-cols-1 justify-items-center mt-20">
            <h1 className="text-3xl mb-5 text-gray-800">Patients</h1>
            <div className="w-3/4 bg-white overflow-auto">
                <table className="min-w-full text-base font-medium text-center">
                    <thead>
                        <tr className="border-b-2 bg-gray-100">
                            {header}
                        </tr>
                    </thead>
                    <tbody>
                        {patient_list}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default PatientList
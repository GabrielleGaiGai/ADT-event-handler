import axios from 'axios';
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';

import { selectAllPatientIds, SetPatients } from "../../app/patientSlice"
import PatientRow from "./PatientRow"

const PatientList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    var patientIds = useSelector((state) => selectAllPatientIds(state))

    useEffect(() => {
        if (!patientIds.length) {
            axios.get('http://localhost:3500/patients')
                .then(res => {
                    const patientsData = res.data;
                    dispatch(SetPatients(patientsData))
                }).catch(err => {
                    console.log(err)
                })
        }
        // eslint-disable-next-line
    }, [dispatch])

    const header_attributes = ["First Name", "Last Name", "Gender", "Status", "Current Bed", "Discharge Date", ""]
    const header = header_attributes.map((attr) =>
        <th key={attr} className="px-5 py-3 font-bold text-gray-600 uppercase tracking-wider">
            {attr}
        </th>
    )

    const patient_list = patientIds.map(patientId => <PatientRow key={patientId} patientId={patientId} />)

    return (
        <div className="grid grid-cols-1 justify-items-center mt-20">
            <button className="absolute right-[15%] top-[4.5rem] rounded-md bg-blue-700 py-3 px-8 text-center font-semibold text-white outline-none hover:bg-blue-400"
                onClick={() => navigate("/new")}>
                Add New Patient
            </button>
            <h1 className="mb-7 text-3xl text-gray-800">
                Patients
            </h1>

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
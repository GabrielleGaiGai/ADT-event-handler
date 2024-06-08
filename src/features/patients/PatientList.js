import { useSelector } from "react-redux"

import { selectAllPatientIds } from "../../app/patientSlice"
import PatientRow from "./PatientRow"

const PatientList = () => {
    const patientIds = useSelector((state) => selectAllPatientIds(state))

    const header_attributes = ["First Name", "Last Name", "Gender", "Current Bed", "Status", "Discharge Date", ""]
    const header = header_attributes.map((attr) =>
        <th key={attr} class="px-5 py-3 font-bold text-gray-600 uppercase tracking-wider">
            {attr}
        </th>
    )

    const patient_list = patientIds.map(patientId => <PatientRow key={patientId} patientId={patientId} />)

    return (
        <div class="grid grid-cols-1 justify-items-center mt-20">
            <h1 class="text-3xl mb-5">Patients</h1>
            <div class="w-3/4 bg-white overflow-auto">
                <table class="min-w-full text-sm text-center">
                    <thead>
                        <tr class="border-b-2 bg-gray-100">
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
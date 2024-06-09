import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams, useLocation, useNavigate } from "react-router-dom"

import { selectPatientById, PatientAdded } from "../../app/patientSlice";


const PatientPage = () => {
    const { patientId } = useParams()

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const readOnly = !location.pathname.includes("edit") && !location.pathname.includes("new")

    const patient = useSelector((state) => selectPatientById(state, patientId))

    const [firstName, setFirstName] = useState(patient?.firstName)
    const [lastName, setLastName] = useState(patient?.lastName)
    const [dateOfBirth, setDateOfBirth] = useState(patient?.dateOfBirth)
    const [gender, setGender] = useState(patient?.gender)
    const [admissionDate, setAdmissionDate] = useState(patient?.admissionDate)
    const [dischargeDate, setDischargeDate] = useState(patient?.dischargeDate)
    const [currentBed, setCurrentBed] = useState(patient?.currentBed)

    const inputStyle = "w-full rounded-md border border-gray-300 py-3 px-6 text-gray-600 outline-none focus:border-blue-600 focus:shadow-md disabled:bg-white"
    const inputSmallStyle = "mb-5 px-3 w-1/2"
    const labelStyle = "mb-3 block text-gray-700"

    const clickEdit = (e) => {
        e.preventDefault()
        navigate("/edit/" + patientId)
    }

    const clickBack = (e) => {
        e.preventDefault()
        navigate("/")
    }

    const clickSave = (e) => {
        e.preventDefault()
        dispatch(PatientAdded({patientId, firstName, lastName, dateOfBirth, gender, admissionDate, dischargeDate, currentBed}))
        navigate("/")
    }


    var button
    if (readOnly) {
        button =
            <button class="w-1/4 ml-10 rounded-md bg-blue-700 mt-5 py-3 px-8 text-center font-semibold text-white outline-none hover:bg-blue-400"
                onClick={clickEdit}>
                Edit Patient
            </button>
    } else {
        button =
            <button class="w-1/4 ml-10 rounded-md bg-blue-700 mt-5 py-3 px-8 text-center font-semibold text-white outline-none hover:bg-blue-400"
                onClick={clickSave}>
                Save and Exit
            </button>
    }

    return (
        <div class="flex items-center justify-center p-12 mt-12">
            <div class="w-full max-w-[800px] bg-white">
                <form class="font-medium text-base">

                    <div class="mb-5">
                        <label for="name" class={labelStyle}>
                            Patient ID
                        </label>
                        <input type="text" name="name" id="name" value={patientId} disabled class={inputStyle} />
                    </div>

                    <div class="-mx-3 flex flex-wrap">
                        <div class={inputSmallStyle}>
                            <label for="firstName" class={labelStyle}>
                                First Name
                            </label>
                            <input type="text" name="firstName" id="firstName" class={inputStyle} value={firstName} disabled={readOnly} required
                                onChange={e => { setFirstName(e.target.value) }} />
                        </div>
                        <div class={inputSmallStyle}>
                            <label for="lastName" class={labelStyle}>
                                Last Name
                            </label>
                            <input type="text" name="lastName" id="lastName" class={inputStyle} value={lastName} disabled={readOnly} required
                                onChange={e => { setLastName(e.target.value) }} />
                        </div>
                        <div class={inputSmallStyle}>
                            <label for="gender" class={labelStyle}>
                                Gender
                            </label>
                            <select name="gender" id="gender" value={gender} disabled={readOnly} required onChange={e => { setGender(e.target.value) }}
                                class={inputStyle + " disabled:text-black"} >
                                <option value="male" >Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class={inputSmallStyle}>
                            <label for="dateOfBirth" class={labelStyle}>
                                Date of Birth
                            </label>
                            <input type="date" name="dateOfBirth" id="dateOfBirth" class={inputStyle} value={dateOfBirth} disabled={readOnly} required
                                onChange={e => { setDateOfBirth(e.target.value) }} />
                        </div>
                        <div class={inputSmallStyle}>
                            <label for="admissionDate" class={labelStyle}>
                                Admission Date
                            </label>
                            <input type="date" name="admissionDate" id="admissionDate" class={inputStyle} value={admissionDate} disabled={readOnly} required
                                onChange={e => { setAdmissionDate(e.target.value) }} />
                        </div>
                        <div class={inputSmallStyle}>
                            <label for="dischargeDate" class={labelStyle}>
                                Discharge Date
                            </label>
                            <input type="date" name="dischargeDate" id="dischargeDate" class={inputStyle} value={dischargeDate} disabled={readOnly}
                                onChange={e => { setDischargeDate(e.target.value) }} />
                        </div>
                    </div>

                    <div class="mb-5">
                        <label for="currentBed" class={labelStyle}>
                            Current Bed
                        </label>
                        <input type="text" name="currentBed" id="currentBed" value={currentBed} disabled={readOnly} class={inputStyle}
                            onChange={e => { setCurrentBed(e.target.value) }} />
                    </div>

                    <div class="mt-5">
                        <button class="w-1/4 rounded-md bg-white py-2.5 px-7.5 border-2 border-blue-700 text-center font-semibold text-blue-700 hover:text-blue-400 hover:border-blue-400"
                            onClick={clickBack}>
                            Back to Patients
                        </button>

                        {button}
                    </div>

                </form>
            </div>
        </div>
    )
}
export default PatientPage
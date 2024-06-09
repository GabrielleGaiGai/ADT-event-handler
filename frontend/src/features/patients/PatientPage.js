import axios from 'axios';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams, useLocation, useNavigate } from "react-router-dom"

import { selectPatientById, AddPatient } from "../../app/patientSlice";

const PatientPage = () => {
    const { patientId } = useParams()

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const readOnly = !location.pathname.includes("edit") && !location.pathname.includes("new")

    const patient = useSelector((state) => selectPatientById(state, patientId))

    const [firstName, setFirstName] = useState(patient?.firstName || "")
    const [lastName, setLastName] = useState(patient?.lastName || "")
    const [dateOfBirth, setDateOfBirth] = useState(patient?.dateOfBirth || "")
    const [gender, setGender] = useState(patient?.gender || "")
    const [admissionDate, setAdmissionDate] = useState(patient?.admissionDate || "")
    const [dischargeDate, setDischargeDate] = useState(patient?.dischargeDate || "")
    const [currentBed, setCurrentBed] = useState(patient?.currentBed || "")

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
        axios.patch('http://localhost:3500/patients', { patientId, firstName, lastName, dateOfBirth, gender, admissionDate, dischargeDate, currentBed })
            .then(res => {
                const patientsData = res.data;
                dispatch(AddPatient(patientsData))
            }).catch(err => {
                console.log(err)
            })
        navigate("/")
    }


    var button
    if (readOnly) {
        button =
            <button className="w-1/4 ml-10 rounded-md bg-blue-700 mt-5 py-3 px-8 text-center font-semibold text-white outline-none hover:bg-blue-400"
                onClick={clickEdit}>
                Edit Patient
            </button>
    } else {
        button =
            <button className="w-1/4 ml-10 rounded-md bg-blue-700 mt-5 py-3 px-8 text-center font-semibold text-white outline-none hover:bg-blue-400"
                onClick={clickSave}>
                Save and Exit
            </button>
    }

    return (
        <div className="flex items-center justify-center p-12 mt-12">
            <div className="w-full max-w-[800px] bg-white">
                <form className="font-medium text-base">

                    <div className="mb-5">
                        <label htmlFor="name" className={labelStyle}>
                            Patient ID
                        </label>
                        <input type="text" name="name" id="name" value={patientId} disabled className={inputStyle} />
                    </div>

                    <div className="-mx-3 flex flex-wrap">
                        <div className={inputSmallStyle}>
                            <label htmlFor="firstName" className={labelStyle}>
                                First Name
                            </label>
                            <input type="text" name="firstName" id="firstName" className={inputStyle} value={firstName} disabled={readOnly} required
                                onChange={e => { setFirstName(e.target.value) }} />
                        </div>
                        <div className={inputSmallStyle}>
                            <label htmlFor="lastName" className={labelStyle}>
                                Last Name
                            </label>
                            <input type="text" name="lastName" id="lastName" className={inputStyle} value={lastName} disabled={readOnly} required
                                onChange={e => { setLastName(e.target.value) }} />
                        </div>
                        <div className={inputSmallStyle}>
                            <label htmlFor="gender" className={labelStyle}>
                                Gender
                            </label>
                            <select name="gender" id="gender" value={gender} disabled={readOnly} required onChange={e => { setGender(e.target.value) }}
                                className={inputStyle + " disabled:text-black"} >
                                <option value="male" >Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className={inputSmallStyle}>
                            <label htmlFor="dateOfBirth" className={labelStyle}>
                                Date of Birth
                            </label>
                            <input type="date" name="dateOfBirth" id="dateOfBirth" className={inputStyle} value={dateOfBirth} disabled={readOnly} required
                                onChange={e => { setDateOfBirth(e.target.value) }} />
                        </div>
                        <div className={inputSmallStyle}>
                            <label htmlFor="admissionDate" className={labelStyle}>
                                Admission Date
                            </label>
                            <input type="date" name="admissionDate" id="admissionDate" className={inputStyle} value={admissionDate} disabled={readOnly} required
                                onChange={e => { setAdmissionDate(e.target.value) }} />
                        </div>
                        <div className={inputSmallStyle}>
                            <label htmlFor="dischargeDate" className={labelStyle}>
                                Discharge Date
                            </label>
                            <input type="date" name="dischargeDate" id="dischargeDate" className={inputStyle} value={dischargeDate} disabled={readOnly}
                                onChange={e => { setDischargeDate(e.target.value) }} />
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="currentBed" className={labelStyle}>
                            Current Bed
                        </label>
                        <input type="text" name="currentBed" id="currentBed" value={currentBed} disabled={readOnly} className={inputStyle}
                            onChange={e => { setCurrentBed(e.target.value) }} />
                    </div>

                    <div className="mt-5">
                        <button className="w-1/4 rounded-md bg-white py-2.5 px-7.5 border-2 border-blue-700 text-center font-semibold text-blue-700 hover:text-blue-400 hover:border-blue-400"
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
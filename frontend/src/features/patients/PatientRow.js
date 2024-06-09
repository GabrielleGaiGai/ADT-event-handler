import { useSelector } from "react-redux"
import { useState } from "react";
import { Link } from "react-router-dom";

import Menu from '@mui/material/Menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faAnglesRight, faArrowRightFromBracket, faRightLeft } from "@fortawesome/free-solid-svg-icons"

import { selectPatientById } from "../../app/patientSlice";

import "./Patient.css"

const PatientRow = ({ patientId }) => {
    const patient = useSelector((state) => selectPatientById(state, patientId))

    const [toggle, setTopple] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const openToggle = (event) => {
        setTopple(true)
        setAnchorEl(event.currentTarget)
    }
    const closeToggle = () => {
        setTopple(false)
        setAnchorEl(null)
    }

    var status;
    var dischargeDate;
    if (patient.dischargeDate) {
        status = <td className="px-5"> <span className="px-3 py-1 bg-red-200 text-red-900 font-semibold rounded-full">discharged</span> </td>
        dischargeDate = <td className="px-5 py-3"> {patient.dischargeDate} </td>
    } else {
        status = <td className="px-5"> <span className="px-3 py-1 bg-green-200 text-green-900 font-semibold rounded-full">active</span> </td>
        dischargeDate = <td> </td>
    }

    return (
        <tr key={patient.patientId} className="border-b text-gray-700">
            <td className="px-5 py-3"> {patient.firstName} </td>
            <td className="px-5 py-3"> {patient.lastName} </td>
            <td className="px-5 py-3"> {patient.gender} </td>
            {status}
            <td className="px-5 py-3"> {patient.currentBed} </td>
            {dischargeDate}
            <th className="px-5 py-3">
                <div className="hover:bg-gray-100 rounded-full " onClick={openToggle} open={toggle}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>

                <Menu open={toggle} onClose={closeToggle} anchorEl={anchorEl}>
                    <div >
                        <Link to={patientId}>
                            <div className="flex items-center gap-x-2 py-2 px-4 hover:bg-gray-100" >
                                <FontAwesomeIcon icon={faAnglesRight} /> View More
                            </div>
                        </Link>
                    </div>
                    <div onClick={closeToggle}>
                        <div className="flex items-center gap-x-2 py-2 px-4  hover:bg-gray-100">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Discharge
                        </div>
                    </div>
                    <div onClick={closeToggle}>
                        <div className="flex items-center gap-x-2 py-2 px-4  hover:bg-gray-100">
                            <FontAwesomeIcon icon={faRightLeft} />Transfer
                        </div>
                    </div>
                </Menu>

            </th>
        </tr >
    )
}
export default PatientRow
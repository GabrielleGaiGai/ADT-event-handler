import { useSelector } from "react-redux"
import { useState } from "react";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

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
        status = <td class="px-5"> <span class="px-3 py-1 bg-red-200 text-red-900 font-semibold rounded-full">discharged</span> </td>
        dischargeDate = <td class="px-5 py-3"> <p class="text-black"> {patient.dischargeDate} </p> </td>
    } else {
        status = <td class="px-5"> <span class="px-3 py-1 bg-green-200 text-green-900 font-semibold rounded-full">active</span> </td>
        dischargeDate = <td> </td>
    }

    return (
        <tr key={patient.patientId} class="border-b text-black">
            <td class="px-5 py-3"> {patient.firstName} </td>
            <td class="px-5 py-3"> {patient.lastName} </td>
            <td class="px-5 py-3"> {patient.gender} </td>
            <td class="px-5 py-3"> {patient.currentBed} </td>
            {status}
            {dischargeDate}
            <th class="px-5 py-3">
                <div class="hover:text-gray-300" onClick={openToggle} open={toggle}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>

                <Menu open={toggle} onClose={closeToggle} anchorEl={anchorEl}>
                    <MenuItem onClick={closeToggle}>Profile</MenuItem>
                    <MenuItem onClick={closeToggle}>My account</MenuItem>
                    <MenuItem onClick={closeToggle}>Logout</MenuItem>
                </Menu>
            </th>
        </tr>
    )
}
export default PatientRow
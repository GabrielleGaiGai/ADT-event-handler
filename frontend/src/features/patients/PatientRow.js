import axios from 'axios';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from "react-redux"
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faAnglesRight, faArrowRightFromBracket, faRightLeft } from "@fortawesome/free-solid-svg-icons"

import { selectPatientById, selectAllBeds, UpdatePatient } from "../../app/patientSlice";

import "./Patient.css"

const PatientRow = ({ patientId }) => {
    const patient = useSelector((state) => selectPatientById(state, patientId))
    var bedList = useSelector((state) => selectAllBeds(state))
    bedList = bedList.filter((bed) => bed !== patient?.currentBed)

    const dispatch = useDispatch()

    const [toggle, setTopple] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDischarge, setOpenDischarge] = useState(false);
    const [openTransfer, setOpenTransfer] = useState(false);
    const [dischargeDate, setDischargeDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [transferBed, setTransferBed] = useState('')

    const openToggle = (event) => {
        setTopple(true)
        setAnchorEl(event.currentTarget)
    }
    const closeToggle = () => {
        setTopple(false)
        setAnchorEl(null)
    }

    const errorRef = useRef()
    const [errormsg, setErrormsg] = useState(null)
    const toggleError = (show) => {
        if (show && errorRef.current.classList.contains("hidden")) {
            errorRef.current.classList.remove("hidden")
        } else if (!show && !errorRef.current.classList.contains("hidden")) {
            errorRef.current.classList.add("hidden")
        }
    }

    const transferPatient = () => {
        if (bedList.includes(transferBed)) {
            setErrormsg("Duplicated bed.")
            toggleError(true)
        } else {
            axios.patch('http://localhost:3500/patients', { ...patient, currentBed: transferBed })
                .then(res => {
                    const patientsData = res.data;
                    dispatch(UpdatePatient(patientsData))
                    setOpenTransfer(false)
                }).catch(err => {
                    setErrormsg(err)
                    toggleError(true)
                })
        }
    }

    const dischargePatient = () => {
        if (dayjs(dischargeDate).isAfter(dayjs()) || dayjs(patient.admissionDate).isAfter(dayjs(dischargeDate))) {
            setErrormsg("Invalid date.")
            toggleError(true)
        } else {
            axios.patch('http://localhost:3500/patients', { ...patient, dischargeDate, currentBed: null })
                .then(res => {
                    const patientsData = res.data;
                    dispatch(UpdatePatient(patientsData))
                    setOpenDischarge(false)
                }).catch(err => {
                    setErrormsg(err)
                    toggleError(true)
                })
        }
    }

    var status;
    var discharged;
    var dischargeDateColumn;
    if (patient.dischargeDate) {
        discharged = true
        status = <td className="px-5"> <span className="px-3 py-1 bg-red-200 text-red-900 font-semibold rounded-full">discharged</span> </td>
        dischargeDateColumn = <td className="px-5 py-3"> {patient.dischargeDate} </td>
    } else {
        discharged = false
        status = <td className="px-5"> <span className="px-3 py-1 bg-green-200 text-green-900 font-semibold rounded-full">active</span> </td>
        dischargeDateColumn = <td> </td>
    }

    return (
        <tr key={patient.patientId} className="border-b text-gray-700">
            <td className="px-5 py-3"> {patient.firstName} </td>
            <td className="px-5 py-3"> {patient.lastName} </td>
            <td className="px-5 py-3"> {patient.gender} </td>
            {status}
            <td className="px-5 py-3"> {patient.currentBed || ""} </td>
            {dischargeDateColumn || ""}
            <th className="px-5 py-3">
                <div className="hover:bg-gray-100 rounded-full " onClick={openToggle} open={toggle}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>

                <Menu open={toggle} onClose={closeToggle} anchorEl={anchorEl} autoFocus={false}>
                    <MenuItem className='hover:bg-gray-100'>
                        <Link to={patientId}>
                            <div className="flex items-center gap-x-2" >
                                <FontAwesomeIcon icon={faAnglesRight} /> View More
                            </div>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={() => { closeToggle(); setOpenDischarge(true) }} className='hover:bg-gray-100' disabled={discharged}>
                        <div className="flex items-center gap-x-2">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Discharge
                        </div>
                    </MenuItem>
                    <MenuItem onClick={() => { closeToggle(); setOpenTransfer(true) }} className='hover:bg-gray-100' disabled={discharged}>
                        <div className="flex items-center gap-x-2">
                            <FontAwesomeIcon icon={faRightLeft} /> Transfer
                        </div>
                    </MenuItem>
                </Menu>

                <Dialog open={openDischarge} onClose={() => setOpenDischarge(false)}>
                    <DialogTitle>Discharge <span className='font-bold'>{patient.firstName} {patient.lastName}</span></DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ mb: 2 }}>
                            Note: current bed will be removed once the patient is discharged.
                        </DialogContentText>
                        <TextField autoFocus required type="date" name="dischargeDate" id="dischargeDate" value={dischargeDate}
                            onChange={(e) => { setDischargeDate(e.target.value); toggleError(false); }} />
                        <div ref={errorRef} className="hidden bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded relative mt-2" role="alert">
                            <p>{errormsg}</p>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => dischargePatient()}>Confirm</Button>
                        <Button onClick={() => setOpenDischarge(false)}>Cancel</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openTransfer} onClose={() => setOpenTransfer(false)}>
                    <DialogTitle >Transfer <span className='font-bold'>{patient.firstName} {patient.lastName}</span> to</DialogTitle>
                    <DialogContent>
                        <div className='flex items-center'>
                            <span className="mr-3 text-lg">Bed: </span>
                            <TextField autoFocus required type="text" name="transferBed" id="transferBed" value={transferBed}
                                onChange={(e) => { setTransferBed(e.target.value); toggleError(false); }} />
                        </div>


                        <div ref={errorRef} className="hidden bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded relative mt-2" role="alert">
                            <p>{errormsg}</p>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => transferPatient()}>Confirm</Button>
                        <Button onClick={() => setOpenTransfer(false)}>Cancel</Button>
                    </DialogActions>
                </Dialog>

            </th>
        </tr >
    )
}
export default PatientRow
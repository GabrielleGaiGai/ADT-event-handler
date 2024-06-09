import { Routes, Route } from 'react-router-dom'
import './index.css'
import PatientList from './features/patients/PatientList'
import PatientPage from './features/patients/PatientPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" >
        <Route index element={<PatientList />}></Route>
        <Route path=":patientId" element={<PatientPage />} ></Route>
        <Route path="edit/:patientId" element={<PatientPage />} ></Route>
        <Route path="new" element={<PatientPage />} ></Route>
      </Route>
    </Routes>
  )
}
export default App
import { Routes, Route } from 'react-router-dom'
import './index.css'
import PatientList from './features/patients/PatientList'

const App = () => {
  return (
    <Routes>
      <Route path="/" >
        <Route index element={<PatientList />}></Route>
      </Route>
    </Routes>
  )
}
export default App
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddEmployee from './components/AddEmployee'
import EmployeeList from './components/EmployeeList'
import EditEmployee from './components/EditEmployee'

export const MyRoutes = () => {
return <BrowserRouter>
        <Routes>
            <Route index element={<EmployeeList/>} />
            <Route path="/add" element={<AddEmployee/>} />
            <Route path="/employee/edit/:id" element={<EditEmployee/>} />
            <Route path="*" element={<h1>NOT FOUND</h1>} />
        </Routes>
    </BrowserRouter>
}
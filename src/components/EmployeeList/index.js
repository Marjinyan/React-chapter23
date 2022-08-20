import { useEffect, useState } from 'react'
import {db} from '../../firebase-config'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import styles from './style.module.css'
import { Link, useNavigate } from 'react-router-dom'

const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const employeeList = collection(db, "employees")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const loadEmployees = async () => {
        setIsLoading(true)
        let data = await getDocs(employeeList)
        setEmployees(data.docs.map(
            elm => ({
                ...elm.data(),
                id:elm.id
            })
        ))
        setIsLoading(false)
    }

    const deleteUser = async id => {
        setIsLoading(true)
        let item = await doc(db, "employees", id)
        await deleteDoc(item)
        setEmployees(employees.filter(elm => id !== elm.id))
        setIsLoading(false)
    }
    
    useEffect(() => {
        loadEmployees()
    }, [])

    return <div>
        <h1 className={styles.title}>List of Employees {employees.length}</h1>
        <Link to="/add">Add an employee</Link>
        {
            isLoading
            ?
            <h1 className={styles.title}> LOADING....</h1>
            :
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>surname</th>
                        <th>position</th>
                        <th>salary</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.length 
                        ? employees.map(elm => {
                            return <tr key={elm.id}>
                                <td>{elm.id}</td>
                                <td>{elm.name}</td>
                                <td>{elm.surname}</td>
                                <td>{elm.position}</td>
                                <td>{elm.salary} AMD</td>
                                <td>
                                    <button
                                        onClick={() => deleteUser(elm.id)}
                                        className={styles.delBtn}>delete</button>
                                    <button
                                        onClick={() => navigate("/employee/edit/"+elm.id)}
                                        className={styles.editBtn}>edit</button>
                                </td>
                            </tr>
                        }) 
                        : (
                            <tr>
                                <td colspan="6">
                                    <h3>No results to show</h3>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        }
    </div>
}
export default EmployeeList
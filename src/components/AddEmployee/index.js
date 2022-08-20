import { db } from '../../firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
    const employeeList = collection(db, "employees");
    const [user, setUser] = useState({
        name: "",
        surname: "",
        salary: "",
        position: "",
    });
    const positions = [
        "Developer", "HR manager", "SMM specialist", "Trainer", "Manager", "CTO", "CEO"
    ];

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        await addDoc(employeeList, user)
        setUser({
            name:"",
            surname:"",
            salary:"",
            position:""
        })
        
        navigate("/")
    }

    return <div>
        <h1>Add Employee</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
        <div>
            <label>name</label>
            <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
        </div>
        <div>
            <label>surname</label>
            <input
                type="text"
                value={user.surname}
                onChange={(e) => setUser({ ...user, surname: e.target.value })}
            />
        </div>
        <div>
            <label>position</label>
            <select
                value={user.position}
                onChange={(e) => setUser({ ...user, position: e.target.value })}
            >
            <option>please select</option>
                {positions.map((elm, i) => {
                    return <option key={i}>{elm}</option>;
                })}
            </select>
        </div>
        <div>
            <label>salary</label>
            <input
                type="number"
                value={user.salary}
                onChange={(e) => setUser({ ...user, salary: e.target.value })}
            />
        </div>
        <div>
            <button>save</button>
        </div>
        </form>
    </div>
    
};
export default AddEmployee;

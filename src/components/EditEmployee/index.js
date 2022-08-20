import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase-config'
import styles from './style.module.css'

const EditEmployee = () => {
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(false)

    
    const getEmployee = async () => {
        let emp = doc(db, "employees", id)
        let info = await getDoc(emp)
        setData(info.data())
    }
    
    useEffect(() => {
        getEmployee()
    }, [])
    
    const [data, setData] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)
        let docRef = doc(db, "employees", id)
        await updateDoc(docRef, data)
        setIsLoading(false)
        navigate("/")
    }

    return <div>
        <h3>Edit employee #{id}</h3>
        {
            !data
            ?
            <p>Loading...</p>
            :
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label>name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData({...data, name:e.target.value})}
                />
                </div>
                <div>
                    <label>surname</label>
                    <input
                        type="text"
                        value={data.surname}
                        onChange={e => setData({...data, surname:e.target.value})}
                />
                </div>
                <div>
                    <label>salary</label>
                    <input
                        type="number"
                        value={data.salary}
                        onChange={e => setData({...data, salary:e.target.value})}
                    />
                </div>
                <div>
                    {
                        isLoading
                        ?
                        <p>Loading....</p>
                        :
                        <button>Update</button>
                    }
                </div>
            </form>
        }
    </div>
}

export default EditEmployee
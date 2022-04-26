import axios from "axios"
import { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from "../pages/context/Context"
import { useNavigate } from "react-router";




export default function GLogin () {

    const {id} = useParams()
    const navigate = useNavigate()
    const {setUserData} = useContext(DataContext)

    useEffect(() => {

        const getData = async () => {
            const response = await axios.get('/users/glogin/'+ id)

            console.log('response:', response)

            if (response.data.success) {

                // add userdata to context
                setUserData({...response.data.user})
                // redirect to home
                navigate('/')
            }
        }

        getData()

    }, [])

    return <div>
        Hello from glogin at client with id {id}
    </div>
}
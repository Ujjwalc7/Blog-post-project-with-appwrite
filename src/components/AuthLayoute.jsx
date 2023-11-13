import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Protected = ({children, authentication = true}) => {
  
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
  
    useEffect( ()=>{
//     another way of doing authenticated rendering ||>
        // if(authStatus === true){
        //     navigate('/')
        // }else if(authStatus === false){
        //     navigate('/login')
        // }


        if (authentication && authStatus !== authentication) {
            navigate('/login')
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoading(false)
    }, [authStatus, navigate, authentication])

    return !loading && <div>{children}</div>
}
export default Protected
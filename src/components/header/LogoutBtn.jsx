import { useDispatch } from "react-redux"
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from "react-router-dom"

const LogoutBtn = () => {
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const logOutHandler = () => {
        authService.logout().then(() => {
        dispatch(logout())
      }).catch((error) => 
        console.log(error)
        )
    }
  return (
    <button className="
     inline-block px-6 py-2 duration-200
      hover:bg-blue-100 rounded-full"
       onClick={logOutHandler}>Logout</button>
  )
}
export default LogoutBtn
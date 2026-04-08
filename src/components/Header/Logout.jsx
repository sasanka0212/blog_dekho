import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import authService from "../../appwrite/auth"
import { useNavigate } from "react-router-dom"

function Logout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = (e) => {
        authService.logout()
            .then(dispatch(logout()))
        navigate("/login")
    }

    return (
        <button onClick={logoutHandler} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
            Logout
        </button>
    )
} 

export default Logout
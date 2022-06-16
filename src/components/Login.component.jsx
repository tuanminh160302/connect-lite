import { signInWithGoogle } from "../firebase/firebase.init";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";
import { useDispatch } from "react-redux";
import { togglePreloader } from "../redux/preloaderSlice";
import { useNavigate } from "react-router";

const LoginComponent = () => {

    const {user, userData} = useContext(UserContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLoginRequest = (e) => {
        e.preventDefault()
        signInWithGoogle()
        dispatch(togglePreloader(true))
    }

    useEffect(() => {
        if (userData) {
            navigate(`/people/${userData.username}`)
        }
    }, [userData])

    return (
        <>
            {
                !user ?
                    <>
                        <button className="bg-bg_navy px-6 py-4 text-white rounded-md text-xs md:text-xs font-medium" onClick={(e) => { handleLoginRequest(e) }}>Login with Google</button>
                    </> :
                    <p className="text-center text-xs md:text-xs font-medium text-white">You are signed in</p>
            }
        </>
    )
}

export default LoginComponent;
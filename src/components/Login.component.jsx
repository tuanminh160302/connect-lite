import { signInWithGoogle } from "../firebase/firebase.init";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";
import { useDispatch } from "react-redux";
import { togglePreloader } from "../redux/preloaderSlice";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";
import { CreateUsers } from "../api/index";

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
        <div className="w-80 h-fit bg-bg_navy rounded-3xl shadow-xl shadow-gray-700/40 transition ease-in-out duration-300 flex flex-col items-center
                        p-8">
            {
                !user ?
                    <>
                        <p className="text-center text-sm md:text-base font-medium mb-4 text-white">Login to continue</p>
                        <button className="bg-bg_light px-6 py-4 text-black rounded-xl text-sm md:text-base font-medium" onClick={(e) => { handleLoginRequest(e) }}>Login with Google</button>
                    </> :
                    <p className="text-center text-sm md:text-base font-medium text-white">You are signed in</p>
            }
        </div>
    )
}

export default LoginComponent;
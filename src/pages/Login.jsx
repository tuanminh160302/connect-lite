import LoginComponent from "../components/Login.component";
import { UserContext } from "../lib/context";
import { useContext } from "react";

const Login = () => {

    const {user, userData} = useContext(UserContext)

    return (
        <div className={`w-full h-screen flex flex-row justify-center items-center`}>
            <LoginComponent />
        </div>
    )
}

export default Login
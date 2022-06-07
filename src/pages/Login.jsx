import LoginComponent from "../components/Login.component";
import { UserContext } from "../lib/context";
import { useContext } from "react";

const Login = () => {

    const user = useContext(UserContext)

    return (
        <div className={`${user ? 'container-user-signed-in' : 'w-full'} h-screen flex flex-row justify-center items-center`}>
            <LoginComponent />
        </div>
    )
}

export default Login
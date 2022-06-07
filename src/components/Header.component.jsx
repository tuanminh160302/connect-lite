import { useContext } from "react"
import { UserContext } from "../lib/context"
import { getAuth, signOut } from "firebase/auth"
import { successToast } from "../lib/toast"
import { ReactComponent as BackIcon } from '../assets/back.svg'

const Header = () => {

    const user = useContext(UserContext)
    const auth = getAuth()

    const handleSignout = () => {
        signOut(auth).then(() => {
            successToast('Signed out')
        }).catch((err) => {
            console.log(err.name, err.code)
        })
    }


    return (
        <div className="w-full h-fit py-5 px-10 md:py-7 md:px-12 flex flex-row justify-between items-center fixed top-0 left-0 z-40 bg-transparent">
            {user ? <div className="w-1/6 bg-bg_navy h-screen absolute top-0 left-0 rounded-r-lg"></div> : null}
            <a className={`header-actions text-black ${user ? 'ml-[18%]' : null}`} href="/">Connect</a>
            {user ?
                <>
                    <button className="bg-bg_navy px-6 py-4 rounded-lg"><a className="header-actions" onClick={() => handleSignout()}>Logout</a></button>
                </>  :
                <button className="bg-bg_navy px-6 py-4 rounded-lg"><a className="header-actions" href="/login">Login</a></button> 
            }
        </div>
    )
}

export default Header
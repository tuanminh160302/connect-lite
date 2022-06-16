import { useContext, useState, useRef, useEffect } from "react"
import { UserContext } from "../lib/context"
import { getAuth, signOut } from "firebase/auth"
import { successToast } from "../lib/toast"
import { ReactComponent as ProfileSVG } from '../assets/profile.svg'
import { ReactComponent as PowerSVG } from '../assets/power.svg'
import gsap from "gsap"
import OptionInModal from "./OptionInModal.component"
import { useLocation, useNavigate } from "react-router"

const Header = () => {

    const {user, userData} = useContext(UserContext)
    const auth = getAuth()
    const [showProfileModal, setShowProfileModal] = useState(false)
    const profileModal = useRef()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSignout = () => {
        signOut(auth).then(() => {
            successToast('Signed out')
        }).catch((err) => {
            console.log(err.name, err.code)
        })
    }

    const handleToggleModal = () => {
        setShowProfileModal(!showProfileModal)
    }

    const handleNavigateUser = () => {
        navigate(`/people/${userData.username}`)
    }

    useEffect(() => {
        showProfileModal ? gsap.to(profileModal.current, { opacity: 1, scaleY: 1, duration: .6, ease: 'slide' }) : gsap.to(profileModal.current, { opacity: 0, scaleY: 0, duration: .6, ease: 'slide' })
    }, [showProfileModal])

    useEffect(() => {
        setShowProfileModal(false)
    }, [location.pathname])

    return (
        <div className="w-full h-fit py-3 px-8 md:py-3 md:px-10 flex flex-row-reverse justify-between items-center fixed top-0 left-0 z-40 bg-bg_navy">
            {
                !user ?
                    <a href="/login"><button className="bg-bg_navy px-4 py-2 header-actions">Login</button></a> :
                    <div className="rounded-full box-border h-8 w-8 relative">
                        <img className="rounded-full h-full w-full cursor-pointer" src={user.photoURL} alt="avatar" onClick={() => { handleToggleModal() }} />
                        {/* {showProfileModal && <div ref={profileModal} className="mt-3 h-80 w-64 bg-bg_navy shadow-xl shadow-cyan-900/40 absolute right-0 rounded-xl"></div>} */}
                        <div ref={profileModal} className="mt-3 h-fit w-fit bg-bg_navy shadow-sm shadow-cyan-900/30 absolute right-0 origin-top scale-y-0">
                            <OptionInModal
                                divStyle="w-full h-fit pt-3 py-2 pl-6 pr-12 md:pt-4 md:py-4 md:pl-8 md:pr-12 flex flex-row items-center cursor-pointer hover:bg-black transition ease-in-out duration-300"
                                SVG={ProfileSVG}
                                description="Profile"
                                SVGStyle="h-5 w-5 cursor-pointer fill-white"
                                textStyle="text-xs font-medium text-white ml-3" 
                                onClick={handleNavigateUser}/>
                            <OptionInModal
                                divStyle="w-full h-fit pb-3 py-2 pl-6 pr-12 md:pb-4 md:py-4 md:pl-8 md:pr-12 flex flex-row items-center cursor-pointer hover:bg-black transition ease-in-out duration-300"
                                SVG={PowerSVG}
                                description="Logout"
                                SVGStyle="h-5 w-5 cursor-pointer fill-white"
                                textStyle="text-xs font-medium text-white ml-3" 
                                onClick={handleSignout}/>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Header
import { useContext, useState, useRef, useEffect } from "react"
import { UserContext } from "../lib/context"
import { getAuth, signOut } from "firebase/auth"
import { successToast } from "../lib/toast"
import gsap from "gsap"

const Header = () => {

    const user = useContext(UserContext)
    const auth = getAuth()
    const [showProfileModal, setShowProfileModal] = useState(false)
    const profileModal = useRef()

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

    useEffect(() => {
        showProfileModal ? gsap.to(profileModal.current, { scaleY: 1, duration: .6, ease: 'slide' }) : gsap.to(profileModal.current, { scaleY: 0, duration: .6, ease: 'slide' })
    }, [showProfileModal])

    return (
        <div className="w-full h-fit py-5 px-10 md:py-7 md:px-12 flex flex-row justify-between items-center fixed top-0 left-0 z-40 bg-transparent">
            {
                user ?
                    <div className="w-1/6 bg-bg_navy h-screen absolute top-0 left-0 rounded-r-lg">
                        <button className="bg-bg_light px-6 py-4 rounded-lg" onClick={() => handleSignout()}><a className="header-actions text-black">Logout</a></button>
                    </div> : null
            }
            <a className={`header-actions text-black ${user ? 'ml-[18%]' : null}`} href="/">Connect</a>
            {
                !user ?
                    <a href="/login"><button className="bg-bg_navy px-6 py-4 rounded-lg header-actions">Login</button></a> :
                    <div className="rounded-full box-border h-14 w-14 relative">
                        <img className="rounded-full h-full w-full cursor-pointer" src={user.photoURL} alt="avatar" onClick={() => { handleToggleModal() }} />
                        {/* {showProfileModal && <div ref={profileModal} className="mt-3 h-80 w-64 bg-bg_navy shadow-xl shadow-cyan-900/40 absolute right-0 rounded-xl"></div>} */}
                        <div ref={profileModal} className="mt-3 h-80 w-64 bg-bg_navy shadow-sm shadow-cyan-900/30 absolute right-0 rounded-xl origin-top scale-y-0"></div>
                    </div>
            }
        </div>
    )
}

export default Header
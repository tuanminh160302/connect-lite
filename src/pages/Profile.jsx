import { useContext } from "react"
import { UserContext } from "../lib/context"
import { useLocation } from "react-router"
import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { fetchUserDataByUsername } from "../firebase/firebase.init"
import { useDispatch } from "react-redux"
import { togglePreloader } from "../redux/preloaderSlice"
import DefaultModal from "../components/DefaultModal.component"
import { ReactComponent as EditSVG } from '../assets/edit.svg'

const Profile = () => {

    const { user, userData } = useContext(UserContext)
    const location = useLocation();
    const auth = getAuth();
    const [profileData, setProfileData] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const pathnameArr = location.pathname.split('/')
        const profileUsername = pathnameArr[pathnameArr.length - 1]
        fetchUserDataByUsername(profileUsername).then((profileData) => {
            setProfileData(profileData)
            setTimeout(() => {
                dispatch(togglePreloader(false))
            }, 500)
        })
    }, [location.pathname])

    return (
        <div className="w-full h-fit px-32 py-28">
            {profileData ?
                <div className="flex flex-row h-fit w-fit">
                    <div className="flex flex-col h-fit w-fit">
                        <DefaultModal className="w-fit h-fit" content={
                            <>
                                <div className='flex flex-row h-fit w-fit items-center'>
                                    <img className="rounded-full h-24 w-24" src={profileData.photoURL} alt="" />
                                    <div className="flex flex-col h-fit w-fit ml-6">
                                        <p className="text-white text-base font-semibold mb-3 inline">{profileData.displayName}</p>
                                        <p className="text-white text-xs font-medium">{profileData.email}</p>
                                    </div>
                                </div>
                            </>
                        } />
                        <DefaultModal className="w-full" content={
                            <>
                                <div className="flex flex-col h-fit w-fit">
                                    <div className="flex flex-row h-fit w-fit">
                                        <p className="text-white text-base font-semibold">Skills and Certifications</p>
                                        <EditSVG className="h-full w-auto fill-white ml-4 cursor-pointer"/>
                                    </div>
                                </div>
                            </>
                        } />
                    </div>
                    {/* <DefaultModal /> */}
                </div>

                : <p>User not found</p>}
        </div>
    )
}

export default Profile
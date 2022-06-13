import { useContext } from "react"
import { UserContext } from "../lib/context"
import { useLocation } from "react-router"
import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import PaginationHeader from "../components/PaginationHeader.component"
import Pagination from "../components/Pagination"
import { useDispatch } from "react-redux"
import { togglePreloader } from "../redux/preloaderSlice"
import { togglePopUp } from "../redux/popUp.slice"
import DefaultModal from "../components/DefaultModal.component"
import { ReactComponent as EditSVG } from '../assets/edit.svg'
import { useQuery } from "@apollo/client/react"
import { QueryUser, QueryUserAllSkills } from "../graphql"
import AddSkills from "../components/AddSkills.component"

const Profile = () => {

    const { user, userData } = useContext(UserContext)
    const location = useLocation();
    const dispatch = useDispatch()

    const pathnameArr = location.pathname.split('/')
    const profileUsername = pathnameArr[pathnameArr.length - 1]

    const [profileData, setProfileData] = useState(null)

    const userAllSkillsData = useQuery(QueryUserAllSkills, { variables: { where: { username: profileUsername } } })
    const { loadng, error, data } = useQuery(QueryUser, { variables: { where: { username: profileUsername } } })

    useEffect(() => {
        if (data) {
            setProfileData(data.users[0])
            setTimeout(() => {
                dispatch(togglePreloader(false))
            }, 500)
        }
    }, [location.pathname, data])

    const handleAddSkill = () => {
        dispatch(togglePopUp(true))
    }

    return (
        <div className="w-full h-fit px-12 py-28">
            {profileData ?
                <div className="flex flex-col h-fit w-full">
                    <div className="flex flex-col h-fit w-fit">
                        <DefaultModal className="w-fit h-fit mb-8" content={
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
                    </div>
                    <div>
                        <div className="flex flex-col h-fit w-fit">
                            <div className="flex flex-row h-fit w-fit">
                                <p className="text-black text-base font-semibold mb-6">Skills and Certifications</p>
                                <EditSVG className="h-full w-auto fill-black ml-4 cursor-pointer" onClick={() => { handleAddSkill() }} />
                            </div>
                            {userAllSkillsData.data && userAllSkillsData.data.users[0].hasSkillConnection.edges.length ?
                                <>
                                    <PaginationHeader target="skills-profile" />
                                    <Pagination
                                        itemsPerPage={6}
                                        items={userAllSkillsData.data ? userAllSkillsData.data.users[0].hasSkillConnection.edges.map(skill => skill.node) : []}
                                        paginationStyle="w-full text-white"
                                        target="skills-profile"
                                        skillsRating={userAllSkillsData.data ? userAllSkillsData.data.users[0].hasSkillConnection.edges.map(skill => skill.level) : []}
                                    />
                                </> : <p>No rated skills added yet</p>
                            }
                        </div>
                    </div>
                    {/* <DefaultModal /> */}
                </div>

                : <p>User not found</p>}

            <AddSkills profileData={profileData} />
        </div>
    )
}

export default Profile
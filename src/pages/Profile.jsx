import { useContext } from "react"
import { UserContext } from "../lib/context"
import { useLocation } from "react-router"
import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import PaginationHeader from "../components/PaginationHeader.component"
import Pagination from "../components/Pagination"
import { useDispatch } from "react-redux"
import { togglePreloader } from "../redux/preloaderSlice"
import { toggleAddSkill } from "../redux/popUp.slice"
import DefaultModal from "../components/DefaultModal.component"
import { ReactComponent as EditSVG } from '../assets/add.svg'
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
        dispatch(toggleAddSkill(true))
    }

    return (
        <>
            {user ?
                <div className="w-full h-fit px-12 py-24">
                    {profileData ?
                        <div className="flex flex-col h-fit w-full">
                            <div className="flex flex-col h-fit w-fit">
                                <DefaultModal className="w-fit h-fit mb-8" content={
                                    <>
                                        <div className='flex flex-row h-fit w-fit items-center'>
                                            <img className="rounded-full h-12 w-12" src={profileData.photoURL} alt="" />
                                            <div className="flex flex-col h-fit w-fit ml-4">
                                                <p className="text-white text-xs font-semibold mb-2 inline">{profileData.displayName}</p>
                                                <p className="text-white text-xs font-medium">{profileData.email}</p>
                                            </div>
                                        </div>
                                    </>
                                } />
                            </div>
                            <div>
                                <div className="flex flex-col h-fit w-full">
                                    <div className="flex flex-row h-fit w-fit items-center mb-6">
                                        <p className="text-black text-xs font-semibold">Skills and Certifications</p>
                                        {
                                            userData ? profileData.uid == userData.uid &&
                                                <><EditSVG className="h-5 w-auto fill-bg_navy ml-2 cursor-pointer" onClick={() => { handleAddSkill() }} /></> : null
                                        }
                                    </div>
                                    {userAllSkillsData.data && userAllSkillsData.data.users[0].hasSkillConnection.edges.length ?
                                        <>
                                            <PaginationHeader className="sticky top-24" target="skills-profile" />
                                            <Pagination
                                                itemsPerPage={6}
                                                items={userAllSkillsData.data ? userAllSkillsData.data.users[0].hasSkillConnection.edges.map(skill => skill.node) : []}
                                                paginationStyle="w-full text-white"
                                                target="skills-profile"
                                                skillsRating={userAllSkillsData.data ? userAllSkillsData.data.users[0].hasSkillConnection.edges.map(skill => skill.level) : []}
                                            />
                                        </> : <p className="text-sm">No rated skills added yet</p>
                                    }
                                </div>
                            </div>
                            {/* <DefaultModal /> */}
                        </div>

                        : <p>User not found</p>}

                    {profileData && <AddSkills profileData={profileData} />}
                </div> :
                <div className="w-screen h-screen px-12 pb-28 flex flex-row items-center justify-center">
                    <a className="bg-bg_navy px-6 py-4 cursor-pointer text-xs font-medium text-white rounded-lg" href="/login">Login to view this content</a>
                </div>
            }
        </>
    )
}

export default Profile
import { useContext } from "react"
import { UserContext } from "../lib/context"
import { useLocation } from "react-router"
import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import Pagination from "../components/Pagination"
import { useDispatch } from "react-redux"
import { togglePreloader } from "../redux/preloaderSlice"
import { togglePopUp } from "../redux/popUp.slice"
import DefaultModal from "../components/DefaultModal.component"
import { ReactComponent as EditSVG } from '../assets/edit.svg'
import { useQuery } from "@apollo/client/react"
import { QueryUser, QuerySkills } from "../graphql"
import PopUpModal from "../components/PopupModal.component"
import { ReactComponent as DeleteSVG } from '../assets/x.svg'

const Profile = () => {

    const { user, userData } = useContext(UserContext)
    const location = useLocation();
    const auth = getAuth();
    const [profileData, setProfileData] = useState(null)
    const dispatch = useDispatch()
    const pathnameArr = location.pathname.split('/')
    const profileUsername = pathnameArr[pathnameArr.length - 1]
    const { loadng, error, data } = useQuery(QueryUser, { variables: { where: { username: profileUsername } } })
    const skillsData = useQuery(QuerySkills)
    const [searchFocus, setSearchFocus] = useState(false)
    const [skillsFiltered, setSkillsFiltered] = useState(null)
    const [selectedSkill, setSelectedSkill] = useState("")

    useEffect(() => {
        if (data) {
            setProfileData(data.users[0])
            setTimeout(() => {
                dispatch(togglePreloader(false))
            }, 500)
        }
    }, [location.pathname, data])

    useEffect(() => {
        if (skillsData.data) {
            setSkillsFiltered(skillsData.data.skills)
        }
    }, [skillsData.data])

    const handleAddSkill = () => {
        dispatch(togglePopUp(true))
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setSelectedSkill(e.target.value)
        setSkillsFiltered(skillsData.data.skills.filter((skill) => { return skill.name.toLowerCase().includes(e.target.value.toLowerCase()) }))
    }

    const allSkills = skillsFiltered ? skillsFiltered.map((skill) => {

        const handleSelectSkill = () => {
            setSelectedSkill(skill.name)
            setSkillsFiltered(skillsData.data.skills.filter((s) => { return s.name == skill.name}))
        }

        return (
            <div key={skill.id} className="cursor-pointer hover:bg-gray-200 transition duration-300 px-4 py-2" onClick={() => { handleSelectSkill() }}>{skill.name}</div>
        )
    }) : null

    return (
        <div className="w-full h-fit px-12 py-28">
            {profileData ?
                <div className="flex flex-col h-fit w-full">
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
                    </div>
                    <DefaultModal className="w-full" content={
                        <>
                            <div className="flex flex-col h-fit w-fit">
                                <div className="flex flex-row h-fit w-fit">
                                    <p className="text-white text-base font-semibold">Skills and Certifications</p>
                                    <EditSVG className="h-full w-auto fill-white ml-4 cursor-pointer" onClick={() => { handleAddSkill() }} />
                                </div>
                                {
                                    <Pagination
                                        itemsPerPage={6}
                                        items={[]}
                                        paginationStyle="w-full" />
                                }
                            </div>
                        </>
                    } />
                    {/* <DefaultModal /> */}
                </div>

                : <p>User not found</p>}
            <PopUpModal
                content={
                    <div className="relative">
                        <p className="text-white font-semibold text-sm mb-4">Add Skill</p>
                        <div className="relative">
                            <input type="text" placeholder="Search skills" value={selectedSkill} name="skillSearch" onChange={(e) => { handleInputChange(e) }} 
                                onFocus={() => { setSearchFocus(true); console.log(skillsFiltered) }} onBlur={() => { setTimeout(() => { setSearchFocus(false) }, 150) }} 
                                className="border-b-2 border-black outline-none px-4 py-2 w-80" />
                            <DeleteSVG className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-600" 
                                onClick={() => { setSelectedSkill(""); setSkillsFiltered(skillsData.data.skills) }} />
                        </div>
                        {searchFocus &&
                            <div className="w-80 max-h-72 overflow-auto bg-white absolute mt-1">
                                {allSkills}
                            </div>}
                    </div>} />
        </div>
    )
}

export default Profile
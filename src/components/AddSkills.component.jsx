import { useState, useEffect, useContext } from "react"
import PopUpModal from "./PopupModal.component"
import { ReactComponent as DeleteSVG } from '../assets/x.svg'
import { useQuery, useMutation, useLazyQuery } from "@apollo/client/react"
import { QueryUser, QueryUserAllSkills, updateUserToSkill, QuerySkills, QuerySkill, QueryUserToSkill, DeleteUserToSkill } from "../graphql"
import { useLocation } from "react-router"
import { successToast, errorToast } from "../lib/toast"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { toggleAddSkill, toggleEditSkill } from "../redux/popUp.slice"
import { UserContext } from "../lib/context"

const AddSkills = ({ target, profileData }) => {

    const location = useLocation()
    const dispatch = useDispatch()
    const {user, userData} = useContext(UserContext)

    const pathnameArr = location.pathname.split('/')
    const profileUsername = pathnameArr[pathnameArr.length - 1]

    const showAddSkill = useSelector(state => state.popup.showAddSkill)
    const showEditSkill = useSelector(state => state.popup.showEditSkill)
    const skillToEdit = useSelector(state => state.popup.skillToEdit)
    const [searchFocus, setSearchFocus] = useState(false)
    const [skillsFiltered, setSkillsFiltered] = useState(null)
    const [selectedSkill, setSelectedSkill] = useState("")
    const [selectedSkillId, setSelectedSkillId] = useState("")
    const [skillLevel, setSkillLevel] = useState(0)
    const [skillToEditData, setSkillToEditData] = useState(null)

    const skillsData = useQuery(QuerySkills)
    const [querySkill] = useLazyQuery(QuerySkill, { variables: { where: { id: skillToEdit } } })
    const [queryUserToSkill] = useLazyQuery(QueryUserToSkill, { variables: { where: { uid: profileData.uid }, hasSkillConnectionWhere2: { node: { id: skillToEdit } } } })
    const [deleteUserToSkill, deleteUserToSkillData] = useMutation(DeleteUserToSkill, {
        refetchQueries: () => [{
            query: QueryUserAllSkills,
            variables: { where: { username: profileUsername } }
        }]
    })
    const [createUserToSkill, userToSkillData] = useMutation(updateUserToSkill, {
        refetchQueries: () => [{
            query: QueryUserAllSkills,
            variables: { where: { username: profileUsername } }
        }]
    })

    useEffect(() => {
        if (skillsData.data) {
            setSkillsFiltered(skillsData.data.skills)
        }
    }, [skillsData.data])

    useEffect(() => {
        !showAddSkill && handleExitAddSkill()
    }, [showAddSkill])

    useEffect(() => {
        !showEditSkill && handleExitEditSkill()
    }, [showEditSkill])

    const handleExitAddSkill = () => {
        setSelectedSkill("")
        setSelectedSkillId("")
        skillsData.data && setSkillsFiltered(skillsData.data.skills)
        setSkillLevel(0)
    }

    const handleExitEditSkill = () => {
        setSkillToEditData(null)
        setSkillLevel(0)
        setSelectedSkill("")
        setSelectedSkillId("")
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setSelectedSkill(e.target.value)
        setSkillsFiltered(skillsData.data.skills.filter((skill) => { return skill.name.toLowerCase().includes(e.target.value.toLowerCase()) }))
    }

    useEffect(() => {
        if (showEditSkill) {
            querySkill().then((res) => {
                setSkillToEditData(res.data)
                setSelectedSkillId(res.data.skills[0].id)
                setSelectedSkill(res.data.skills[0].name)
            })
            queryUserToSkill().then((res) => {
                console.log(res)
                console.log(res.data.users[0].hasSkillConnection.edges[0].level)
                setSkillLevel(res.data.users[0].hasSkillConnection.edges[0].level)
            })
        }
    }, [showEditSkill])

    const handleCreateUserToSkill = () => {
        if (profileData.uid === userData.uid) {
            console.log(selectedSkillId)
            querySkill({ variables: { where: {OR: [{id: selectedSkillId}, {name: selectedSkill}]}} }).then((res) => {
                console.log(res)
                if (res.data.skills.length) {
                    createUserToSkill({
                        variables: { where: { uid: profileData.uid }, connect: { hasSkill: [{ where: { node: { name: selectedSkill } }, edge: { level: parseInt(skillLevel) } }] } },
                    }).then(() => {
                            successToast("Skillset updated")
                            dispatch(toggleAddSkill(false))
                        }).catch(err => console.log(err.name))
                } else {
                    errorToast("Skill not found")
                }
            })
        } else {
            errorToast("Not authorized")
        }
    }

    const handleSelectLevel = (e) => {
        e.preventDefault()
        setSkillLevel(parseInt(e.target.id))
    }

    const handleDeleteSkill = () => {
        deleteUserToSkill({variables: {where: {uid: profileData.uid}, disconnect: {hasSkill: [{where: {node: {name: selectedSkill}}}]}}}).then((res) => {
            console.log(res.data)
            successToast("Skill deleted")
            dispatch(toggleEditSkill(false))
        }).catch(err => console.log(err))
    }

    const allSkills = skillsFiltered ? skillsFiltered.map((skill) => {
        const handleSelectSkill = () => {
            setSelectedSkillId(skill.id)
            setSelectedSkill(skill.name)
            setSkillsFiltered(skillsData.data.skills.filter((s) => { return s.name == skill.name }))
        }

        return (
            <div key={skill.id} className="flex flex-row px-4 py-2 cursor-pointer items-center" onClick={() => { handleSelectSkill() }}>
                <img className="w-8 h-8 rounded-full mr-3" src={skill.photoURL} alt="" />
                <div className="flex flex-col text-black text-xs">
                    <p>{skill.name}</p>
                </div>
            </div>
        )
    }) : null

    return (
        <>
            {
                showAddSkill &&
                <PopUpModal
                    content={
                        <div className="relative">
                            <p className="text-white font-semibold text-xs mb-4">Add Skill</p>
                            <div className="relative text-xs">
                                <input type="text" placeholder="Search skills" value={selectedSkill} name="skillSearch" autoComplete="off" onChange={(e) => { handleInputChange(e) }}
                                    onFocus={() => { setSearchFocus(true) }} onBlur={() => { setTimeout(() => { setSearchFocus(false) }, 150) }}
                                    className="border-b-2 border-black outline-none px-4 py-2 w-80" />
                                {selectedSkill && <DeleteSVG className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-600"
                                    onClick={() => { setSelectedSkill(""); setSkillsFiltered(skillsData.data.skills); setSelectedSkillId("") }} />}
                            </div>
                            {searchFocus &&
                                <div className="w-80 max-h-72 overflow-auto bg-white absolute text-xs">
                                    {allSkills}
                                </div>}
                            <div className="w-full h-fit flex flex-row justify-between text-xs font-medium mt-4">
                                <p id='1' className={`p-2 border-2 border-white cursor-pointer flex-grow flex justify-center
                        ${skillLevel != '1' ? 'text-white hover:text-black transition duration-300 ease-in-out hover:bg-white' : 'text-black bg-white'}`}
                                    onClick={(e) => { handleSelectLevel(e) }}>Knowledgable</p>
                                <p id='2' className={`p-2 border-2 border-white cursor-pointer flex-grow flex justify-center
                        ${skillLevel != '2' ? 'text-white hover:text-white transition duration-300 ease-in-out hover:bg-sky-600' : 'text-white bg-sky-600'}`}
                                    onClick={(e) => { handleSelectLevel(e) }}>Proficient</p>
                                <p id='3' className={`p-2 border-2 border-white cursor-pointer flex-grow flex justify-center
                        ${skillLevel != '3' ? 'text-white hover:text-white transition duration-300 ease-in-out hover:bg-red-600' : 'text-white bg-red-600'}`}
                                    onClick={(e) => { handleSelectLevel(e) }}>Lead/Teach</p>
                            </div>
                            <button
                                className="border-2 border-white text-white text-xs font-semibold py-2 px-4 float-right mt-4 hover:bg-white hover:text-black transition duration-300 ease-in-out"
                                onClick={() => handleCreateUserToSkill()}>Add</button>
                        </div>} />
            }
            {
                showEditSkill &&
                <PopUpModal
                    content={
                        <div className="relative">
                            <p className="text-white font-semibold text-xs mb-4">Edit Skill</p>
                            <>
                                {
                                    skillToEditData ?
                                        <>
                                            <div className="relative">
                                                <p className='text-xs text-white'>{skillToEditData.skills[0].name}</p>
                                            </div>
                                            <div className="w-full h-fit flex flex-row justify-between text-xs font-medium mt-4">
                                                <p id='1' className={`p-2 border-2 border-white cursor-pointer 
                    ${skillLevel != '1' ? 'text-white hover:text-black transition duration-300 ease-in-out hover:bg-white' : 'text-black bg-white'}`}
                                                    onClick={(e) => { handleSelectLevel(e) }}>Knowledgable</p>
                                                <p id='2' className={`p-2 border-2 border-white cursor-pointer 
                    ${skillLevel != '2' ? 'text-white hover:text-white transition duration-300 ease-in-out hover:bg-sky-600' : 'text-white bg-sky-600'}`}
                                                    onClick={(e) => { handleSelectLevel(e) }}>Proficient</p>
                                                <p id='3' className={`p-2 border-2 border-white cursor-pointer 
                    ${skillLevel != '3' ? 'text-white hover:text-white transition duration-300 ease-in-out hover:bg-red-600' : 'text-white bg-red-600'}`}
                                                    onClick={(e) => { handleSelectLevel(e) }}>Lead/Teach</p>
                                            </div>
                                            <div>
                                                <button
                                                    className="border-2 border-white text-white text-xs font-semibold py-2 px-6 float-right mt-4 hover:bg-white hover:text-black transition duration-300 ease-in-out"
                                                    onClick={() => {handleCreateUserToSkill()}}>Update</button>
                                                <button
                                                    className="border-2 border-white text-white text-xs font-semibold py-2 px-6 float-right mt-4 hover:bg-white hover:text-black transition duration-300 ease-in-out"
                                                    onClick={() => {handleDeleteSkill()}}>Delete</button>
                                            </div>
                                        </> : <p className="text-sm text-white">Loading...</p>
                                }
                            </>
                        </div>} />
            }
        </>
    )
}

export default AddSkills
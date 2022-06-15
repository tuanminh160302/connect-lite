import { useEffect, useState } from "react"
import { useQuery, useMutation } from "@apollo/client/react"
import { DeleteSkill } from "../../graphql/admin/skill"
import { successToast, errorToast } from "../../lib/toast"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { toggleFalse } from "../../redux/popUp.slice"
import { QuerySkills } from "../../graphql"
import { ReactComponent as DeleteSVG } from '../../assets/x.svg'

const DeleteSkillComponent = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [searchFocus, setSearchFocus] = useState(false)
    const [skillsFiltered, setSkillsFiltered] = useState(null)
    const [selectedSkills, setSelectedSkills] = useState([])

    const allSkillsData = useQuery(QuerySkills)
    const [deleteSkill, deleteSkillData] = useMutation(DeleteSkill, {
        refetchQueries: () => [{
            query: QuerySkills
        }]
    })

    console.log(allSkillsData.data)

    useEffect(() => {
        allSkillsData.data && setSkillsFiltered(allSkillsData.data.skills)
    }, [allSkillsData.data])

    const handleExitDeleteSkill = () => {
        setName("")
        setSelectedSkills([])
        dispatch(toggleFalse())
    }

    const handleDeleteSkills = (e) => {
        e.preventDefault()
        selectedSkills.map((skill) => {
            deleteSkill({ variables: { where: { id: skill.id } } }).then((res) => {
                console.log(res.data)
            }).catch(err => { console.log(err) })
        })
        successToast("Succesfully deleted")
        handleExitDeleteSkill()
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
        setSkillsFiltered(allSkillsData.data.skills.filter((skill) => { return skill.name.toLowerCase().includes(e.target.value.toLowerCase()) }))
    }

    const allSkills = skillsFiltered ? skillsFiltered.map((skill) => {

        const handleSelectSkill = () => {
            let temp = selectedSkills
            if (!temp.includes(skill)) {
                temp.push(skill)
                setSelectedSkills(temp)
                setSkillsFiltered(allSkillsData.data.skills)
                setName("")
                successToast("Skill selected")
            } else {
                errorToast("Skill already selected")
            }
        }

        return (
            <div key={skill.id} className='flex flex-row px-4 py-2 cursor-pointer items-center' onClick={(e) => { handleSelectSkill(e) }}>
                <img className="w-10 h-10 rounded-full mr-3" src={skill.photoURL} alt="" />
                <div className="flex flex-col text-black text-xs">
                    <p>{skill.name}</p>
                </div>
            </div>
        )
    }) : null

    const selectedSkillsComponent = selectedSkills.map((skill) => {

        const handleRemoveSelectedSkill = () => {
            try {
                let temp = selectedSkills
                const index = temp.indexOf(skill)
                temp.splice(index, 1)
                setSelectedSkills([...temp])
                successToast("Removed")
            } catch (err) {
                console.log(err)
                errorToast("An error has occured")
            }
        }

        return (
            <div key={skill.id} className='flex flex-row py-2 cursor-pointer items-center relative'>
                <img className="w-10 h-10 rounded-full mr-3" src={skill.photoURL} alt="" />
                <div className="flex flex-col text-white text-xs">
                    <p>{skill.name}</p>
                </div>
                <DeleteSVG className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-200" onClick={() => { handleRemoveSelectedSkill() }} />
            </div>
        )
    })

    return (
        <>
            <div className="relative">
                <input type="text" placeholder="Search by skill name" value={name} name="skillSearch" autoComplete="off" onChange={(e) => { handleInputChange(e) }}
                    onFocus={() => { setSearchFocus(true) }} onBlur={() => { setTimeout(() => { setSearchFocus(false) }, 150) }}
                    className="border-none outline-none px-4 py-2 w-80 text-black" />
                {name && <DeleteSVG className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-600"
                    onClick={() => { setName(""); setSkillsFiltered(allSkillsData.data.skills) }} />}
            </div>
            {searchFocus &&
                <div className="w-80 max-h-72 overflow-auto bg-white absolute mt-1 z-20">
                    {allSkills}
                </div>}
            <div className="max-h-72 overflow-auto pt-4">
                {selectedSkillsComponent}
            </div>
            <button className="w-fit h-fit px-4 py-2 text-sm text-white font-medium border-none rounded-sm bg-red-500 mt-2 float-right" onClick={(e) => { handleDeleteSkills(e) }}>Delete</button>
        </>
    )
}

export default DeleteSkillComponent
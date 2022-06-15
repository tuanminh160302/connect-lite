import { useEffect, useState, useContext, useCallback } from "react"
import { UserContext } from "../../lib/context"
import { useDropzone } from "react-dropzone"
import { uploadImage } from "../../firebase/firebase.init"
import { useQuery, useMutation } from "@apollo/client/react"
import { UpdateSkillInfo } from "../../graphql/admin/skill"
import { successToast, errorToast } from "../../lib/toast"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { toggleFalse } from "../../redux/popUp.slice"
import { QuerySkills, QueryCategoryValueOnly, QueryJobRoleValueOnly } from "../../graphql"
import { ReactComponent as DeleteSVG } from '../../assets/x.svg'

const UpdateSkillComponent = () => {

    const { user, userData } = useContext(UserContext)
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [des, setDes] = useState("")
    const [category, setCategory] = useState("")
    const [jobRole, setJobRole] = useState("")
    const [iconFile, setIconFile] = useState(null)
    const [searchFocus, setSearchFocus] = useState(false)
    const [skillsFiltered, setSkillsFiltered] = useState(null)
    const [categoryFiltered, setCategoryFiltered] = useState(null)
    const [jobRoleFiltered, setJobRoleFiltered] = useState(null)
    const [selectedSkills, setSelectedSkills] = useState(null)
    const [searchCatFocus, setSearchCatFocus] = useState(false)
    const [searchJobFocus, setSearchJobFocus] = useState(false)

    const allSkillsData = useQuery(QuerySkills)
    const allCategoriesData = useQuery(QueryCategoryValueOnly)
    const allJobRolesData = useQuery(QueryJobRoleValueOnly)
    const [updateSkillInfo, updateSkillInfoData] = useMutation(UpdateSkillInfo, {
        refetchQueries: () => [{
            query: QuerySkills
        }]
    })
    useEffect(() => {
        allSkillsData.data && setSkillsFiltered(allSkillsData.data.skills)
    }, [allSkillsData.data])

    useEffect(() => {
        allCategoriesData.data && setCategoryFiltered(allCategoriesData.data.categories)
    }, [allCategoriesData.data])

    useEffect(() => {
        allJobRolesData.data && setJobRoleFiltered(allJobRolesData.data.jobRoles)
    }, [allJobRolesData.data])

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        acceptedFiles.forEach((file) => {
            const url = URL.createObjectURL(file)
            Object.assign(file, { preview: url })
            setIconFile(file)
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg']
        },
        onDrop,
        maxFiles: 1
    })

    const handleExitUpdateSkill = () => {
        setName("")
        setDes("")
        setCategory("")
        setJobRole("")
        setCategoryFiltered(null)
        setJobRoleFiltered(null)
        setIconFile(null)
        setSelectedSkills(null)
        dispatch(toggleFalse())
    }

    const handleUpdateSkills = (e) => {
        e.preventDefault()
        uploadImage(user, iconFile).then((res) => {
            const photoURL = res ? res : selectedSkills.photoURL
            const skillObject = {
                name,
                description: des,
                photoURL
            }
            const skillConnectObject = {
                skillIn: {
                    where: {
                        node: {
                            value: category
                        }
                    }
                },
                skillFor: {
                    where: {
                        node: {
                            value: jobRole
                        }
                    }
                }
            }
            if (category)
                updateSkillInfo({ variables: { where: { id: selectedSkills.id }, update: skillObject, connect: skillConnectObject } }).then((res) => {
                    console.log(res)
                    successToast("Succesfully updated")
                    handleExitUpdateSkill()
                }).catch(err => console.log(err))
        })
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        if (e.target.name == "name") {
            setName(e.target.value)
            setSkillsFiltered(allSkillsData.data.skills.filter((skill) => { return skill.name.toLowerCase().includes(e.target.value.toLowerCase()) }))
        } else if (e.target.name == 'category') {
            setCategory(e.target.value)
            setCategoryFiltered(allCategoriesData.data.categories.filter((category) => { return category.value.toLowerCase().includes(e.target.value.toLowerCase()) }))
        } else if (e.target.name == 'job-role') {
            setJobRole(e.target.value)
            setJobRoleFiltered(allJobRolesData.data.jobRoles.filter((job) => { return job.value.toLowerCase().includes(e.target.value.toLowerCase()) }))
        }
        e.target.name == "des" && setDes(e.target.value)
    }

    const allSkills = skillsFiltered ? skillsFiltered.map((skill) => {

        const handleSelectSkill = () => {
            console.log(skill)
            setSelectedSkills(skill)
            setName(skill.name)
            setDes(skill.description)
            setCategory(skill.skillIn ? skill.skillIn.value : "")
            setJobRole(skill.skillFor ? skill.skillFor.value : "")
            successToast("Skill selected")
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

    const allCategories = categoryFiltered ? categoryFiltered.map((category, index) => {

        const handleSelectCategory = () => {
            setCategory(category.value)
            setCategoryFiltered(allCategoriesData.data.categories.filter((c) => { return c.value == category.value }))
        }

        return (
            <div key={index} className="cursor-pointer text-black px-4 py-2" onClick={() => { handleSelectCategory() }}>{category.value}</div>
        )
    }) : null

    const allJobRoles = jobRoleFiltered ? jobRoleFiltered.map((job, index) => {

        const handleSelectJob = () => {
            setJobRole(job.value)
            setJobRoleFiltered(allJobRolesData.data.jobRoles.filter((j) => { return j.value == job.value }))
        }

        return (
            <div key={index} className="cursor-pointer text-black px-4 py-2" onClick={() => { handleSelectJob() }}>{job.value}</div>
        )
    }) : null

    const handleRemoveSelectedSkill = () => {
        setSelectedSkills(null)
        setName("")
        setDes("")
        setCategory("")
        setJobRole("")
        setIconFile(null)
        setSkillsFiltered(allSkillsData.data.skills)
        setCategoryFiltered(allCategoriesData.data.categories)
        setJobRoleFiltered(allJobRolesData.data.jobRoles)
        successToast("Removed")
    }

    return (
        <>
            {
                !selectedSkills ?
                    <>
                        <div className="relative text-xs">
                            <input type="text" placeholder="Search by skill name" value={name} name="name" autoComplete="off" onChange={(e) => { handleInputChange(e) }}
                                onFocus={() => { setSearchFocus(true) }} onBlur={() => { setTimeout(() => { setSearchFocus(false) }, 150) }}
                                className="border-none outline-none px-4 py-2 w-80 text-black" />
                            {name && <DeleteSVG className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-500"
                                onClick={() => { setName(""); setSkillsFiltered(allSkillsData.data.skills) }} />}
                        </div>
                        {searchFocus &&
                            <div className="w-80 max-h-72 overflow-auto bg-white absolute mt-1 z-20 text-xs">
                                {allSkills}
                            </div>}
                    </> :
                    <div className="h-fit w-80 text-xs">
                        <div key={selectedSkills.id} className='flex flex-row py-2 cursor-pointer items-center relative mb-2'>
                            {
                                !iconFile ?
                                    <div className='bg-transparent text-white cursor-pointer mr-3' {...getRootProps()}>
                                        <img className="w-10 h-10" src={selectedSkills.photoURL} alt="" />
                                        <input {...getInputProps()} />
                                    </div> :
                                    <div className="bg-transparent text-white cursor-pointer mr-3" {...getRootProps()}>
                                        <img className="h-10 w-10" src={iconFile.preview} alt="" />
                                        <input {...getInputProps()} />
                                    </div>
                            }
                            {/* <div className="flex flex-col text-white">
                                <p>{selectedSkills.name}</p>
                            </div> */}
                            <input value={name} className="text-black outline-none border-none px-4 py-2 grow" type="text" name="name" onChange={(e) => { handleInputChange(e) }} />
                            <DeleteSVG className="h-4 w-4 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-500" onClick={() => { handleRemoveSelectedSkill() }} />
                        </div>
                        <label>Description</label>
                        <input type="text" name="des" value={des} className="w-full outline-none border-none px-4 py-2 mt-1 mb-3 text-black" onChange={(e) => { handleInputChange(e) }} />
                        <label>Category</label>
                        <div className="relative mb-3">
                            <input className="w-full outline-none border-none px-4 py-2 mt-1 text-black" required type="text" name="category" value={category}
                                onChange={(e) => { handleInputChange(e) }} onFocus={() => { setSearchCatFocus(true) }} onBlur={() => { setTimeout(() => { setSearchCatFocus(false) }, 150) }} />
                            {category && <DeleteSVG className="h-4 w-4 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-500"
                                onClick={() => { setCategory(""); setCategoryFiltered(allCategoriesData.data.categories) }} />}
                            {searchCatFocus &&
                                <div className="w-80 max-h-72 overflow-auto bg-white absolute mt-1 z-20">
                                    {allCategories}
                                </div>}
                        </div>
                        <label>Job Role</label>
                        <div className="relative">
                            <input className="w-full outline-none border-none px-4 py-2 mt-1 text-black" required type="text" name="job-role" value={jobRole}
                                onChange={(e) => { handleInputChange(e) }} onFocus={() => { setSearchJobFocus(true) }} onBlur={() => { setTimeout(() => { setSearchJobFocus(false) }, 150) }} />
                            {jobRole && <DeleteSVG className="h-4 w-4 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-500"
                                onClick={() => { setJobRole(""); setJobRoleFiltered(allJobRolesData.data.jobRoles) }} />}
                            {searchJobFocus &&
                                <div className="w-80 max-h-72 overflow-auto bg-white absolute mt-1 z-20">
                                    {allJobRoles}
                                </div>}
                        </div>
                        <button className="w-fit h-fit px-4 py-2 text-sm text-white font-medium border-none rounded-sm bg-red-500 mt-4 float-right" onClick={(e) => { handleUpdateSkills(e) }}>Update</button>
                    </div>
            }
        </>
    )
}

export default UpdateSkillComponent
import { useState, useCallback, useContext, useEffect } from "react"
import { useQuery, useMutation, useLazyQuery } from "@apollo/client/react"
import { QuerySkill, QuerySkills, QueryCategoryValueOnly, QueryJobRoleValueOnly } from "../../graphql"
import { CreateSkill } from "../../graphql/admin/skill"
import { successToast, errorToast } from "../../lib/toast"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { toggleFalse } from "../../redux/popUp.slice"
import { useDropzone } from "react-dropzone"
import { ReactComponent as DeleteSVG } from '../../assets/x.svg'
import { uploadImage } from "../../firebase/firebase.init"
import { UserContext } from "../../lib/context"

const CreateSkillComponent = () => {

    const { user, userData } = useContext(UserContext)
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [des, setDes] = useState("")
    const [ID, setID] = useState("")
    const [category, setCategory] = useState("")
    const [jobRole, setJobRole] = useState("")
    const [categoryFiltered, setCategoryFiltered] = useState(null)
    const [jobRoleFiltered, setJobRoleFiltered] = useState(null)
    const [iconFile, setIconFile] = useState(null)
    const [searchCatFocus, setSearchCatFocus] = useState(false)
    const [searchJobFocus, setSearchJobFocus] = useState(false)


    const allCategoriesData = useQuery(QueryCategoryValueOnly)
    const allJobRolesData = useQuery(QueryJobRoleValueOnly)
    const [querySkill] = useLazyQuery(QuerySkill)
    const [createSkillRecord, newSkillRecord] = useMutation(CreateSkill, {
        refetchQueries: () => [{
            query: QuerySkills
        }]
    })

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

    const handleExitCreateSkill = () => {
        setName("")
        setDes("")
        setID("")
        setCategory("")
        setJobRole("")
        setCategoryFiltered(null)
        setJobRoleFiltered(null)
        setIconFile(null)
        dispatch(toggleFalse())
    }

    const handleCreateUser = (e) => {
        e.preventDefault()
        querySkill({ variables: { where: {name} } }).then((res) => {
            console.log(res.data.skills)
            if (res.data.skills.length != 0) {
                errorToast("Skill already registered")
            } else {
                uploadImage(user, iconFile).then((res) => {
                    const skillObject = {
                        name,
                        photoURL: res,
                        description: des,
                        id: ID,
                        skillIn: {
                            connect: {
                                where: {
                                    node: {
                                        value: category
                                    }
                                }
                            }
                        }
                    }
                    createSkillRecord({variables: {input: [skillObject]}}).then((res) => {
                        console.log(res.data)
                        successToast("Skill created")
                        handleExitCreateSkill()
                    }).catch(err => console.log(err))
                })
            }
        })
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        e.target.name == "name" && setName(e.target.value)
        e.target.name == "description" && setDes(e.target.value)
        e.target.name == "id" && setID(e.target.value)
        e.target.name == "category" && setCategory(e.target.value)
        e.target.name == "job-role" && setJobRole(e.target.value)

        e.target.name == "category" && setCategoryFiltered(allCategoriesData.data.categories.filter((category) => { return category.value.toLowerCase().includes(e.target.value.toLowerCase()) }))
        e.target.name == "job-role" && setJobRoleFiltered(allJobRolesData.data.jobRoles.filter((job) => { return job.value.toLowerCase().includes(e.target.value.toLowerCase()) }))
    }

    const handleDeleteIcon = () => {
        setIconFile(null)
    }

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

    return (
        <>
            <form action="submit" className="flex flex-col w-80 text-xs" onSubmit={(e) => { handleCreateUser(e) }}>
                <label className="mb-2">Name</label>
                <input className="w-full mb-4 outline-none border-none px-3 py-2 text-black" required type="text" name="name" value={name}
                    onChange={(e) => { handleInputChange(e) }} />
                <label className="mb-2">Description</label>
                <input className="w-full mb-4 outline-none border-none px-3 py-2 text-black" required type="text" name="description" value={des}
                    onChange={(e) => { handleInputChange(e) }} />
                <label className="mb-2">ID</label>
                <input className="w-full mb-4 outline-none border-none px-3 py-2 text-black" required type="text" name="id" value={ID}
                    onChange={(e) => { handleInputChange(e) }} />
                <label className="mb-2">Category</label>
                <div className="relative mb-4">
                    <input className="w-full outline-none border-none px-3 py-2 text-black" required type="text" name="category" value={category}
                        onChange={(e) => { handleInputChange(e) }} onFocus={() => { setSearchCatFocus(true) }} onBlur={() => { setTimeout(() => { setSearchCatFocus(false) }, 150) }} />
                    {category && <DeleteSVG className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-600"
                        onClick={() => { setCategory(""); setCategoryFiltered(allCategoriesData.data.categories) }} />}
                    {searchCatFocus &&
                        <div className="w-80 max-h-72 overflow-auto bg-white absolute mt-1 z-20">
                            {allCategories}
                        </div>}
                </div>
                <label className="mb-2">Job Role</label>
                <div className="relative mb-4">
                    <input className="w-full outline-none border-none px-3 py-2 text-black" required type="text" name="job-role" value={jobRole}
                        onChange={(e) => { handleInputChange(e) }} onFocus={() => { setSearchJobFocus(true) }} onBlur={() => { setTimeout(() => { setSearchJobFocus(false) }, 150) }} />
                    {jobRole && <DeleteSVG className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-600"
                        onClick={() => { setJobRole(""); setJobRoleFiltered(allJobRolesData.data.jobRoles) }} />}
                    {searchJobFocus &&
                        <div className="w-80 max-h-72 overflow-auto bg-white absolute mt-1 z-20">
                            {allJobRoles}
                        </div>}
                </div>
                <label className="mb-2">Skill icon</label>
                {
                    !iconFile ?
                        <div className='bg-transparent text-white px-3 py-4 cursor-pointer border-2 border-dashed h-20 flex justify-center items-center' {...getRootProps()}>
                            {isDragActive ?
                                <p className='guide'>Drop the files here</p> :
                                <p className='guide'>Drag and drop some files here, or click to select files</p>}
                            <input {...getInputProps()} />
                        </div> :
                        <div className="relative">
                            <img className="h-10 w-10" src={iconFile.preview} alt="" />
                            <DeleteSVG className="h-4 w-4 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-200" onClick={() => { handleDeleteIcon() }} />
                        </div>
                }
                <button className="w-fit h-fit px-4 py-2 text-white font-medium border-none rounded-sm bg-sky-500 mt-3 self-end">Create</button>
            </form>
        </>
    )
}

export default CreateSkillComponent
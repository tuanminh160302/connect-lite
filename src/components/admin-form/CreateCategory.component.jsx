import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { useQuery, useMutation, useLazyQuery } from "@apollo/client/react"
import { QueryCategoryValueOnly, QueryCategory } from "../../graphql"
import { CreateCategory } from "../../graphql/admin/category"
import { successToast, errorToast } from "../../lib/toast"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { toggleFalse } from "../../redux/popUp.slice"

const CreateCategoryComponent = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const [queryCategory] = useLazyQuery(QueryCategory)
    const [createCategory, newCategoryRecord] = useMutation(CreateCategory, {
        refetchQueries: () => [{
            query: QueryCategoryValueOnly
        }]
    })

    const handleExitCreateCategory = () => {
        setName("")
        dispatch(toggleFalse())
    }

    const handleCreateCategory = (e) => {
        e.preventDefault()
        queryCategory({variables: {where: {value: name}}}).then((res) => {
            if (res.data.categories.length != 0) {
                errorToast("Category already registered")
            } else {       
                createCategory({variables: {input: [{value: name}]}}).then((res) => {
                    console.log(res.data)
                    successToast("Category created")
                    handleExitCreateCategory()
                }).catch(err => console.log(err))
            }
        })
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        e.target.name == "name" && setName(e.target.value)
    }

    return (
        <>
            <form action="submit" className="flex flex-col w-80" onSubmit={(e) => {handleCreateCategory(e)}}>
                <label className="text-sm mb-2">Name</label>
                <input className="w-full mb-4 outline-none border-none px-3 py-2 text-black" required type="text" name="name" value={name}
                    onChange={(e) => {handleInputChange(e)}}/>
                <button className="w-fit h-fit px-4 py-2 text-sm text-white font-medium border-none rounded-sm bg-sky-500 mt-2 self-end">Create</button>
            </form>
        </>
    )
}

export default CreateCategoryComponent
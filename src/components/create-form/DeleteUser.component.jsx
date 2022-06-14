import { useState } from "react"
import { useQuery, useMutation, useLazyQuery } from "@apollo/client/react"
import { QueryUser } from "../../graphql"
import { successToast, errorToast } from "../../lib/toast"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { toggleFalse } from "../../redux/popUp.slice"

const DeleteUserComponent = () => {

    const dispatch = useDispatch()
    // const 
    const [searchFocus, setSearchFocus] = useState(false)

    const handleExitCreateUser = () => {
        setDisplayName("")
        setEmail("")
        dispatch(toggleFalse())
    }

    const handleDeleteUser = (e) => {
        e.preventDefault()

    }

    const handleInputChange = (e) => {
        e.preventDefault()
        e.target.name == "email" && setEmail(e.target.value)
        e.target.name == "displayName" && setDisplayName(e.target.value)
    }

    return (
        <>
            <div className="relative">
                <input type="text" placeholder="Search skills" value="" name="skillSearch" autoComplete="off" onChange={(e) => { handleInputChange(e) }}
                    onFocus={() => { setSearchFocus(true) }} onBlur={() => { setTimeout(() => { setSearchFocus(false) }, 150) }}
                    className="border-b-2 border-black outline-none px-4 py-2 w-80" />
            </div>
            {searchFocus &&
                <div className="w-80 max-h-72 overflow-auto bg-white absolute mt-1">
                    
                </div>}
        </>
    )
}

export default DeleteUserComponent
import { useEffect, useState } from "react"
import { useQuery, useMutation, useLazyQuery } from "@apollo/client/react"
import { QueryUser } from "../../graphql"
import { DeleteUser } from "../../graphql/admin/user"
import { successToast, errorToast } from "../../lib/toast"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { toggleFalse } from "../../redux/popUp.slice"
import { QueryPeople } from "../../graphql"
import { ReactComponent as DeleteSVG } from '../../assets/x.svg'

const DeleteUserComponent = () => {

    const dispatch = useDispatch()
    const [displayName, setDisplayName] = useState("")
    const [searchFocus, setSearchFocus] = useState(false)
    const [usersFiltered, setUsersFiltered] = useState(null)
    const [selectedUsers, setSelectedUsers] = useState([])

    const allUsersData = useQuery(QueryPeople)
    const [deleteUser, deleteUserData] = useMutation(DeleteUser, {
        refetchQueries: () => [{
            query: QueryPeople
        }]
    })

    useEffect(() => {
        allUsersData.data && setUsersFiltered(allUsersData.data.users)
    }, [allUsersData.data])

    const handleExitDeleteUser = () => {
        setDisplayName("")
        setSelectedUsers([])
        dispatch(toggleFalse())
    }

    const handleDeleteUsers = (e) => {
        e.preventDefault()
        selectedUsers.map((user) => {
            deleteUser({variables: {where: {uid: user.uid}}}).then((res) => {
                console.log(res.data)
            }).catch(err => {console.log(err)})
        })
        successToast("Succesfully deleted")
        handleExitDeleteUser()
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setDisplayName(e.target.value)
        setUsersFiltered(allUsersData.data.users.filter((user) => { return user.displayName.toLowerCase().includes(e.target.value.toLowerCase()) || user.email.toLowerCase().includes(e.target.value.toLowerCase()) }))
    }

    const allUsers = usersFiltered ? usersFiltered.map((user) => {

        const handleSelectUser = () => {
            let temp = selectedUsers
            if (!temp.includes(user)) {
                temp.push(user)
                setSelectedUsers(temp)
                setUsersFiltered(allUsersData.data.users)
                setDisplayName("")
                successToast("User selected")
            } else {
                errorToast("User already selected")
            }
        }

        return (
            <div key={user.uid} className='flex flex-row px-4 py-2 cursor-pointer items-center' onClick={(e) => { handleSelectUser(e) }}>
                <img className="w-10 h-10 rounded-full mr-3" src={user.photoURL} alt="" />
                <div className="flex flex-col text-black text-xs">
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                </div>
            </div>
        )
    }) : null

    const selectedUsersComponent = selectedUsers.map((user) => {

        const handleRemoveSelectedUser = () => {
            try {
                let temp = selectedUsers
                const index = temp.indexOf(user)
                temp.splice(index, 1)
                setSelectedUsers([...temp])
                successToast("User removed from delete list")
            } catch (err) {
                console.log(err)
                errorToast("An error has occured")
            }
        }

        return (
            <div key={user.uid} className='flex flex-row py-2 cursor-pointer items-center relative'>
                <img className="w-10 h-10 rounded-full mr-3" src={user.photoURL} alt="" />
                <div className="flex flex-col text-white text-xs">
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                </div>
                <DeleteSVG className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-200" onClick={() => { handleRemoveSelectedUser() }} />
            </div>
        )
    })

    return (
        <>
            <div className="relative">
                <input type="text" placeholder="Search by full name or email" value={displayName} name="skillSearch" autoComplete="off" onChange={(e) => { handleInputChange(e) }}
                    onFocus={() => { setSearchFocus(true) }} onBlur={() => { setTimeout(() => { setSearchFocus(false) }, 150) }}
                    className="border-none outline-none px-4 py-2 w-80 text-black" />
            </div>
            {searchFocus &&
                <div className="w-80 max-h-72 overflow-auto bg-white absolute mt-1 z-20">
                    {allUsers}
                </div>}
            <div className="max-h-72 overflow-auto pt-4">
                {selectedUsersComponent}
            </div>
            <button className="w-fit h-fit px-4 py-2 text-sm text-white font-medium border-none rounded-sm bg-red-500 mt-2 float-right" onClick={(e) => {handleDeleteUsers(e)}}>Delete</button>
        </>
    )
}

export default DeleteUserComponent
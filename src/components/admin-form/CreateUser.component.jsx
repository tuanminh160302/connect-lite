import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { useQuery, useMutation, useLazyQuery } from "@apollo/client/react"
import { QueryUser, QueryPeople } from "../../graphql"
import { CreateUser } from "../../graphql/admin/user"
import { successToast, errorToast } from "../../lib/toast"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { toggleFalse } from "../../redux/popUp.slice"

const CreateUserComponent = () => {

    const dispatch = useDispatch()
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")

    const [queryUser] = useLazyQuery(QueryUser)
    const [createUserRecord, newUserRecord] = useMutation(CreateUser, {
        refetchQueries: () => [{
            query: QueryPeople
        }]
    })

    const handleExitCreateUser = () => {
        setDisplayName("")
        setEmail("")
        dispatch(toggleFalse())
    }

    const handleCreateUser = (e) => {
        e.preventDefault()
        queryUser({variables: {where: {email}}}).then((res) => {
            if (res.data.users.length != 0) {
                errorToast("Email already registered")
            } else {
                const username = email.split("@")[0]
                const photoURL = "https://dummyimage.com/300x300/912a91/ab7fab.png"
                const createdAt = new Date().getTime().toString()
                let uid;
                //Make sure uid is unique in db
                let proceed = false
                while(proceed == false) {
                    uid = uuidv4();
                    queryUser({variables: {where: {uid}}}).then((res) => {
                        if (res.data.users.length == 0) {
                            proceed = true
                        } 
                    })
                    break
                }
                const userObject = {
                    username,
                    email,
                    createdAt,
                    displayName,
                    photoURL,
                    uid
                }
        
                createUserRecord({variables: {input: [userObject]}}).then((res) => {
                    console.log(res.data)
                    successToast("User created")
                    handleExitCreateUser()
                }).catch(err => console.log(err))
            }
        })
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        e.target.name == "email" && setEmail(e.target.value)
        e.target.name == "displayName" && setDisplayName(e.target.value)
    }

    return (
        <>
            <form action="submit" className="flex flex-col w-80 text-xs" onSubmit={(e) => {handleCreateUser(e)}}>
                <label className="text-xs mb-2">Email</label>
                <input className="w-full mb-4 outline-none border-none px-3 py-2 text-black" required type="email" name="email" value={email}
                    onChange={(e) => {handleInputChange(e)}}/>
                <label className="text-xs mb-2">Display Name</label>
                <input className="w-full mb-4 outline-none border-none px-3 py-2 text-black" required type="text" name="displayName" value={displayName}
                    onChange={(e) => {handleInputChange(e)}}/>
                <button className="w-fit h-fit px-4 py-2 text-xs text-white font-medium border-none rounded-sm bg-sky-500 mt-2 self-end">Create</button>
            </form>
        </>
    )
}

export default CreateUserComponent
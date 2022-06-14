import { useContext, useEffect, useState } from "react"
import { UserContext } from "../lib/context"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { togglePreloader } from "../redux/preloaderSlice"
import { useQuery } from "@apollo/client/react"
import { QueryAdmin } from "../graphql"

const Admin = () => {

    const { user, userData } = useContext(UserContext)
    const dispatch = useDispatch()
    const queryAdmin = useQuery(QueryAdmin)
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            dispatch(togglePreloader(false))
        }, 500)
    }, [])

    useEffect(() => {
        if (user && queryAdmin.data) {
            setAuthorized(user.uid == queryAdmin.data.admins[0].uid)
        }
    }, [user, queryAdmin.data])

    return (
        <>
            {
                user ?
                    <>
                        {
                            authorized ?
                                <div className="w-full h-fit px-12 pb-28">
                                    
                                </div> :
                                <div className="w-screen h-screen px-12 pb-28 flex flex-row items-center justify-center">
                                    <a className="bg-bg_navy px-6 py-4 text-sm font-medium text-white rounded-lg">You do not have the authorization to this content</a>
                                </div>
                        }
                    </> :
                    <div className="w-screen h-screen px-12 pb-28 flex flex-row items-center justify-center">
                        <a className="bg-bg_navy px-6 py-4 cursor-pointer text-sm font-medium text-white rounded-lg" href="/login">Login to view this content</a>
                    </div>
            }
        </>
    )
}

export default Admin
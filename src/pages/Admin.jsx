import { useContext, useEffect, useState } from "react"
import { UserContext } from "../lib/context"
import { useDispatch, useSelector } from "react-redux"
import { togglePreloader } from "../redux/preloaderSlice"
import { useQuery } from "@apollo/client/react"
import { QueryAdmin } from "../graphql"
import DefaultModal from "../components/DefaultModal.component"
import AdminPanel from "../components/AdminPanel.component"
import { toggleAdmin } from "../redux/popUp.slice"

const Admin = () => {

    const { user, userData } = useContext(UserContext)
    const dispatch = useDispatch()
    const queryAdmin = useQuery(QueryAdmin)
    const [authorized, setAuthorized] = useState(false)
    const [target, setTarget] = useState(null)
    const [action, setAction] = useState(null)
    const showAdmin = useSelector(state => state.popup.showAdmin)

    useEffect(() => {
        setTimeout(() => {
            dispatch(togglePreloader(false))
        }, 500)
    }, [])

    useEffect(() => {
        if (user && queryAdmin.data) {
            queryAdmin.data.admins.forEach((admin) => {
                user.uid === admin.uid && setAuthorized(true)
            })
        }
    }, [user, queryAdmin.data])

    useEffect(() => {
        if (!showAdmin) {
            setTarget(null)
            setAction(null)
        }
     }, [showAdmin])

    const buttonClass = "w-fit h-fit px-4 py-2 text-xs text-white font-medium mr-3 border-none rounded-sm"

    return (
        <>
            {
                user ?
                    <>
                        {
                            authorized ?
                                <div className="flex flex-col h-fit w-full px-12 py-24 text-xs">
                                    <div className="w-full h-fit flex flex-row flex-wrap ">
                                        <DefaultModal className='w-fit mr-3' content={
                                            <>
                                                <p className="font-medium mb-4 text-white">Edit Users</p>
                                                <div className="flex flex-row w-fit h-fit">
                                                    <button className={`${buttonClass} bg-sky-500`} 
                                                        onClick={() => {dispatch(toggleAdmin(true)); setTarget('user'); setAction('Create')}}>Create User</button>
                                                    <button className={`${buttonClass} bg-red-500`}
                                                        onClick={() => {dispatch(toggleAdmin(true)); setTarget('user'); setAction('Delete')}}>Delete User</button>
                                                    {/* <button className={`${buttonClass} bg-amber-500`}
                                                        onClick={() => {dispatch(toggleAdmin(true)); setTarget('user'); setAction('Update')}}>Update User</button> */}
                                                </div>
                                            </>
                                        } />
                                        <DefaultModal className='w-fit mr-3' content={
                                            <>
                                                <p className="font-medium mb-4 text-white">Edit Skills</p>
                                                <div className="flex flex-row w-fit h-fit">
                                                    <button className={`${buttonClass} bg-sky-500`}
                                                        onClick={() => {dispatch(toggleAdmin(true)); setTarget('skill'); setAction('Create')}}>Create Skill</button>
                                                    <button className={`${buttonClass} bg-red-500`}
                                                        onClick={() => {dispatch(toggleAdmin(true)); setTarget('skill'); setAction('Delete')}}>Delete Skill</button>
                                                    <button className={`${buttonClass} bg-amber-500`}
                                                        onClick={() => {dispatch(toggleAdmin(true)); setTarget('skill'); setAction('Update')}}>Update Skill</button>
                                                </div>
                                            </>
                                        } />
                                        <DefaultModal className='w-fit mr-3' content={
                                            <>
                                                <p className="font-medium mb-4 text-white">Edit Categories</p>
                                                <div className="flex flex-row w-fit h-fit">
                                                    <button className={`${buttonClass} bg-sky-500`}
                                                        onClick={() => {dispatch(toggleAdmin(true)); setTarget('category'); setAction('Create')}}>Create Category</button>
                                                    <button className={`${buttonClass} bg-red-500`}
                                                        onClick={() => {dispatch(toggleAdmin(true)); setTarget('category'); setAction('Delete')}}>Delete Category</button>
                                                    <button className={`${buttonClass} bg-amber-500`}
                                                        onClick={() => {dispatch(toggleAdmin(true)); setTarget('category'); setAction('Update')}}>Update Category</button>
                                                </div>
                                            </>
                                        } />
                                        <DefaultModal className='w-fit mr-3' content={
                                            <>
                                                <p className="font-medium mb-4 text-white">Edit Job Roles</p>
                                                <div className="flex flex-row w-fit h-fit">
                                                    <button className={`${buttonClass} bg-sky-500`}
                                                        onClick={() => {dispatch(toggleAdmin(true)); setTarget('job'); setAction('Create')}}>Create Job Role</button>
                                                    <button className={`${buttonClass} bg-red-500`}
                                                        onClick={() => {dispatch(toggleAdmin(true)); setTarget('job'); setAction('Delete')}}>Delete Job Role</button>
                                                    <button className={`${buttonClass} bg-amber-500`}
                                                        onClick={() => {dispatch(toggleAdmin(true)); setTarget('job'); setAction('Update')}}>Update Job Role</button>
                                                </div>
                                            </>
                                        } />
                                    </div>
                                    {showAdmin && <AdminPanel target={target} action={action}/>}
                                </div> :
                                <div className="w-screen h-screen px-12 pb-28 flex flex-row items-center justify-center">
                                    <a className="bg-bg_navy px-6 py-4 text-xs font-medium text-white rounded-lg">You do not have the authorization to this content</a>
                                </div>
                        }
                    </> :
                    <div className="w-screen h-screen px-12 pb-28 flex flex-row items-center justify-center">
                        <a className="bg-bg_navy px-6 py-4 cursor-pointer text-xs font-medium text-white rounded-lg" href="/login">Login to view this content</a>
                    </div>
            }
        </>
    )
}

export default Admin
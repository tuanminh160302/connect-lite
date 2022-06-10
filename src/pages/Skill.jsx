import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { togglePreloader } from "../redux/preloaderSlice"
import { useQuery } from "@apollo/client"
import { QuerySkill } from "../graphql"
import { useLocation } from "react-router"
import DefaultModal from "../components/DefaultModal.component"

const Skill = () => {

    const location = useLocation()
    const dispatch = useDispatch()

    const skill = location.pathname.split("/")[location.pathname.split("/").length - 1]
    const { loading, error, data } = useQuery(QuerySkill, { variables: { where: { id: skill } } })

    useEffect(() => {
        setTimeout(() => {
            dispatch(togglePreloader(false))
        }, 500)
    }, [])

    return (
        <div className="w-full h-fit px-12 py-28">
            {data ?
                <div className="flex flex-row">
                    <div className="h-fit w-fit flex flex-col">
                        <DefaultModal className="mr-4" content={
                            <>
                                <div className='flex flex-row h-fit w-fit items-center'>
                                    <img className="rounded-full h-24 w-24" src={data.skills[0].photoURL} alt="" />
                                    <div className="flex flex-col h-fit w-fit ml-6">
                                        <p className="text-white text-base font-semibold mb-3 inline">{data.skills[0].name}</p>
                                        <p className="text-white text-xs font-medium max-w-xs leading-loose">{data.skills[0].description}</p>
                                    </div>
                                </div>
                            </>
                        } />

                        <DefaultModal className="h-fit w-full" content={
                            <>
                                <p className="text-white text-base font-semibold mb-4">Related skills</p>
                                <div className='flex flex-row h-fit w-fit items-center'>
                                    <img className="rounded-full h-16 w-16 cursor-pointer" src={data.skills[0].photoURL} alt="" />

                                </div>
                            </>
                        } />
                    </div>
                </div> : null}
        </div>
    )
}

export default Skill
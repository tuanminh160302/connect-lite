import { useEffect, Fragment, useContext } from "react"
import { useDispatch } from "react-redux"
import { togglePreloader } from "../redux/preloaderSlice"
import { useQuery } from "@apollo/client"
import { QuerySkill, QueryRelatedSkills } from "../graphql"
import { useLocation, useNavigate } from "react-router"
import DefaultModal from "../components/DefaultModal.component"
import { UserContext } from "../lib/context"

const Skill = () => {

    const { user, userData } = useContext(UserContext)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const skill = location.pathname.split("/")[location.pathname.split("/").length - 1]

    const skillres = useQuery(QuerySkill, { variables: { where: { id: skill } } })
    const relatedSkillRes = useQuery(QueryRelatedSkills, { variables: { where: { id: skill } } })

    useEffect(() => {
        setTimeout(() => {
            dispatch(togglePreloader(false))
        }, 500)
    }, [location.pathname])

    const handleRedirectSkill = (e) => {
        e.preventDefault()
        navigate(`/skills/${e.target.alt}`)
    }

    const relatedSkill = relatedSkillRes.data && relatedSkillRes.data.skills[0].skillIn.hasSkill.map((data) => {
        return (
            <Fragment key={data.id}>
                {data.id !== skill && <img onClick={(e) => { handleRedirectSkill(e) }} className="rounded-full h-10 w-10 cursor-pointer mb-4 mr-4" draggable={false} src={data.photoURL} alt={data.id} />}
            </Fragment>
        )
    })

    return (
        <>
            {user ?
                <div className="w-full h-fit px-12 py-28">
                    {skillres.data ?
                        <div className="flex flex-row w-full">
                            <div className="h-fit w-full flex flex-row">
                                <DefaultModal className="w-1/3" content={
                                    <>
                                        <div className='flex h-fit w-fit items-start'>
                                            <img className="rounded-full h-12 w-12" draggable={false} src={skillres.data.skills[0].photoURL} alt="" />
                                            <div className="flex flex-col h-fit w-fit ml-4">
                                                <p className="text-white text-xs font-semibold mb-2 inline">{skillres.data.skills[0].name}</p>
                                                <p className="text-white text-xs font-medium max-w-xs max-h-40 overflow-auto leading-loose">{skillres.data.skills[0].description}</p>
                                            </div>
                                        </div>
                                    </>
                                } />

                                <DefaultModal className="flex-grow pb-8 ml-3" content={
                                    <>
                                        <p className="text-white text-xs font-semibold mb-8">Related skills</p>
                                        <div className='flex flex-row h-fit w-fit items-center flex-wrap'>
                                            {relatedSkill}
                                        </div>
                                    </>
                                } />
                            </div>
                        </div> : null}
                </div> :
                <div className="w-screen h-screen px-12 pb-28 flex flex-row items-center justify-center">
                    <a className="bg-bg_navy px-6 py-4 cursor-pointer text-xs font-medium text-white rounded-lg" href="/login">Login to view this content</a>
                </div>
            }
        </>
    )
}

export default Skill
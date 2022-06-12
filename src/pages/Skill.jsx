import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { togglePreloader } from "../redux/preloaderSlice"
import { useQuery } from "@apollo/client"
import { QuerySkill, QueryRelatedSkills } from "../graphql"
import { useLocation, useNavigate } from "react-router"
import DefaultModal from "../components/DefaultModal.component"

const Skill = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const skill = location.pathname.split("/")[location.pathname.split("/").length - 1]

    const skillres = useQuery(QuerySkill, { variables: { where: { id: skill } } })
    const relatedSkillRes = useQuery(QueryRelatedSkills, {variables: {where: {id: skill}}})

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
        return(
            <img key={data.id} onClick={(e) => {handleRedirectSkill(e)}} className="rounded-full h-16 w-16 cursor-pointer mb-4 mr-4" draggable={false} src={data.photoURL} alt={data.id} />
        )
    })

    return (
        <div className="w-full h-fit px-12 py-28">
            {skillres.data ?
                <div className="flex flex-row w-4/12 mr-4">
                    <div className="h-fit w-full flex flex-col">
                        <DefaultModal className="w-full" content={
                            <>
                                <div className='flex flex-row h-fit w-fit items-center'>
                                    <img className="rounded-full h-24 w-24" draggable={false} src={skillres.data.skills[0].photoURL} alt="" />
                                    <div className="flex flex-col h-fit w-fit ml-6">
                                        <p className="text-white text-base font-semibold mb-3 inline">{skillres.data.skills[0].name}</p>
                                        <p className="text-white text-xs font-medium max-w-xs leading-loose">{skillres.data.skills[0].description}</p>
                                    </div>
                                </div>
                            </>
                        } />

                        <DefaultModal className="h-fit w-full pb-8" content={
                            <>
                                <p className="text-white text-base font-semibold mb-8">Related skills</p>
                                <div className='flex flex-row h-fit w-fit items-center flex-wrap'>
                                    {relatedSkill}
                                </div>
                            </>
                        } />
                    </div>
                </div> : null}
        </div>
    )
}

export default Skill
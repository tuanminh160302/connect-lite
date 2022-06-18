import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { togglePreloader } from "../redux/preloaderSlice"

const Project = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(togglePreloader(false))
        }, 500)
    },[])

    return (
        <div className="py-24 px-12">Under construction</div>
    )
}

export default Project
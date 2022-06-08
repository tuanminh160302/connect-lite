import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { togglePreloader } from "../redux/preloaderSlice"

const Skills = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(togglePreloader(false))
        }, 500)
    }, [])

    return (
        <div></div>
    )
}

export default Skills
import { useEffect, useState, useContext } from "react"
import { useDispatch } from "react-redux"
import { togglePreloader } from "../redux/preloaderSlice"
import Pagination from "../components/Pagination"
import { useQuery } from '@apollo/client';
import { QuerySkills } from '../graphql/index'
import PaginationHeader from "../components/PaginationHeader.component";
import { UserContext } from "../lib/context";

const Skills = () => {

    // const items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

    const [items, setItems] = useState(null)
    const dispatch = useDispatch()
    const { loading, error, data } = useQuery(QuerySkills)
    const [searchValue, setSearchValue] = useState('')
    const { user, userData } = useContext(UserContext)

    useEffect(() => {
        setTimeout(() => {
            dispatch(togglePreloader(false))
        }, 500)
    }, [])

    useEffect(() => {
        if (data) {
            setItems(data.skills)
        }
    }, [data])

    useEffect(() => {
        if (data) {
            setItems(data.skills.filter((skill) => { return skill.name.toLowerCase().includes(searchValue) }))
        }
    }, [searchValue])

    const handleInputChange = (e) => {
        e.preventDefault()
        setSearchValue(e.target.value.toLowerCase())
    }

    return (
        <> 
            {
                user ?
                    <div className="w-full h-fit px-12 pb-28">
                        {
                            items ?
                                <>
                                    <div className="z-10 sticky top-0 pt-24 bg-bg_light text-xs">
                                        <input autoComplete="off" className="py-1 px-2 mb-2 border-2 border-bg_navy" name='search' type="text" value={searchValue} placeholder="Search skills..." onChange={(e) => { handleInputChange(e) }} />
                                        <PaginationHeader target="skills" />
                                    </div>
                                    <Pagination
                                        itemsPerPage={6}
                                        items={items}
                                        paginationStyle="w-full h-fit text-white"
                                        target="skills"
                                    />
                                </>
                                : null
                        }
                    </div> :
                    <div className="w-screen h-screen px-12 pb-28 flex flex-row items-center justify-center">
                        <a className="bg-bg_navy px-6 py-4 cursor-pointer text-xs font-medium text-white rounded-lg" href="/login">Login to view this content</a>
                    </div>
            }
        </>
    )
}

export default Skills
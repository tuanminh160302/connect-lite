import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { togglePreloader } from "../redux/preloaderSlice"
import Pagination from "../components/Pagination"
import { useQuery } from '@apollo/client';
import { QueryPeople } from '../graphql/index'

const People = () => {

    // const items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

    const [items, setItems] = useState(null)
    const dispatch = useDispatch()
    const { loading, error, data } = useQuery(QueryPeople)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        setTimeout(() => {
            dispatch(togglePreloader(false))
        }, 500)
    }, [])

    useEffect(() => {
        if (data) {
            setItems(data.users)
        }
    }, [data])


    useEffect(() => {
        if (data) {
            setItems(data.users.filter((user) => { return user.displayName.toLowerCase().includes(searchValue)}))
        }
    }, [searchValue])

    const handleInputChange = (e) => {
        e.preventDefault()
        setSearchValue(e.target.value.toLowerCase())
    }

    return (
        <div className="w-full h-fit px-12 pb-28">
            {
                items ?
                    <>
                        <div className="z-10 sticky top-0 pt-28 bg-bg_light">
                            <input className="py-2 px-3 mb-5 border-2 border-bg_navy" name='search' type="text" value={searchValue} placeholder="Search skills..." onChange={(e) => { handleInputChange(e) }} />
                            <div className="w-full h-20 border-b-2 bg-bg_navy_dark border-gray-300 flex flex-row items-center">
                                <div className="px-8 py-5 border-r-2 border-gray-300 h-full flex items-center"><p className="text-white w-14 flex justify-center items-center">Avatar</p></div>
                                <div className="p-5 w-[15%] border-r-2 border-gray-300 h-full flex items-center"><p className="text-white flex justify-center items-center">Name</p></div>
                                <div className="p-5 w-[35%] border-r-2 border-gray-300 h-full flex items-center"><p className="text-white flex justify-center items-center">Bio</p></div>
                            </div>
                        </div>
                        <Pagination
                            itemsPerPage={6}
                            items={items}
                            paginationStyle="w-full h-fit text-white"
                            target="people"
                        />
                    </>
                    : null
            }
        </div>
    )
}

export default People
import { useEffect, useState } from "react"
import { useQuery, useMutation } from "@apollo/client/react"
import { DeleteCategory } from "../../graphql/admin/category"
import { successToast, errorToast } from "../../lib/toast"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { toggleFalse } from "../../redux/popUp.slice"
import { QueryCategoryValueOnly } from "../../graphql"
import { ReactComponent as DeleteSVG } from '../../assets/x.svg'

const DeleteCategoryComponent = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [searchFocus, setSearchFocus] = useState(false)
    const [categoriesFilter, setCategoriesFilter] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState([])

    const allCategoriesData = useQuery(QueryCategoryValueOnly)
    const [deleteCategory, deleteCategoryData] = useMutation(DeleteCategory, {
        refetchQueries: () => [{
            query: QueryCategoryValueOnly
        }]
    })

    useEffect(() => {
        allCategoriesData.data && setCategoriesFilter(allCategoriesData.data.categories)
    }, [allCategoriesData.data])

    const handleExitDeleteCategory = () => {
        setName("")
        setSelectedCategories([])
        dispatch(toggleFalse())
    }

    const handleDeleteCategories = (e) => {
        e.preventDefault()
        selectedCategories.map((category) => {
            deleteCategory({ variables: { where: { value: category.value } } }).then((res) => {
                console.log(res.data)
                successToast("Succesfully deleted")
                handleExitDeleteCategory()
            }).catch(err => { console.log(err) })
        })
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
        setCategoriesFilter(allCategoriesData.data.categories.filter((category) => { return category.value.toLowerCase().includes(e.target.value.toLowerCase()) }))
    }

    const allCategories = categoriesFilter ? categoriesFilter.map((category, index) => {

        const handleSelectCategory = () => {
            let temp = selectedCategories
            if (!temp.includes(category)) {
                temp.push(category)
                setSelectedCategories(temp)
                setCategoriesFilter(allCategoriesData.data.categories)
                setName("")
                successToast("Category selected")
            } else {
                errorToast("Category already selected")
            }
        }

        return (
            <div key={index} className='flex flex-row px-4 py-2 cursor-pointer items-center' onClick={(e) => { handleSelectCategory(e) }}>
                <p className="text-xs text-black">{category.value}</p>
            </div>
        )
    }) : null

    const selectedCategoriesComponent = selectedCategories.map((category, index) => {

        const handleRemoveSelectedCategory = () => {
            try {
                let temp = selectedCategories
                const index = temp.indexOf(category)
                temp.splice(index, 1)
                setSelectedCategories([...temp])
                successToast("Removed")
            } catch (err) {
                console.log(err)
                errorToast("An error has occured")
            }
        }

        return (
            <div key={index} className='flex flex-row py-2 cursor-pointer items-center relative'>
                    <p className="text-xs ">{category.value}</p>
                <DeleteSVG className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-200" onClick={() => { handleRemoveSelectedCategory() }} />
            </div>
        )
    })

    return (
        <div className="text-xs">
            <div className="relative">
                <input type="text" placeholder="Search for category" value={name} name="categorySearch" autoComplete="off" onChange={(e) => { handleInputChange(e) }}
                    onFocus={() => { setSearchFocus(true) }} onBlur={() => { setTimeout(() => { setSearchFocus(false) }, 150) }}
                    className="border-none outline-none px-4 py-2 w-80 text-black" />
                {name && <DeleteSVG className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-600"
                    onClick={() => { setName(""); setCategoriesFilter(allCategoriesData.data.categories) }} />}
            </div>
            {searchFocus &&
                <div className="w-80 max-h-72 overflow-auto bg-white absolute mt-1 z-20 text-xs">
                    {allCategories}
                </div>}
            <div className="max-h-72 overflow-auto pt-4">
                {selectedCategoriesComponent}
            </div>
            <button className="w-fit h-fit px-4 py-2 text-xs text-white font-medium border-none rounded-sm bg-red-500 mt-2 float-right" onClick={(e) => { handleDeleteCategories(e) }}>Delete</button>
        </div>
    )
}

export default DeleteCategoryComponent
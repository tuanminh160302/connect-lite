import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux/es/exports";
import { toggleEditSkill } from "../redux/popUp.slice";

const Pagination = ({ itemsPerPage, items, paginationStyle, target, skillsRating }) => {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [currentRatings, setCurrentRatings] = useState(null)
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        skillsRating && setCurrentRatings(skillsRating.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, items]);

    useEffect(() => {
        setItemOffset(0)
    }, [items])

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };

    const Items = ({ currentItems, target }) => {
        return (
            <>
                {currentItems &&
                    currentItems.map((item, index) => {

                        const handleNavigateSkill = () => {
                            switch (target) {
                                case 'skills': case 'skills-profile':
                                    navigate(`/skills/${item.id}`)
                                    break
                                case 'people':
                                    navigate(`/people/${item.username}`)
                                    break
                                default:
                                    return null
                            }
                        }

                        const convertRatingToString = (rating) => {
                            switch (rating) {
                                case 1:
                                    return "Knowledgable"
                                case 2:
                                    return "Proficient"
                                case 3:
                                    return "Lead/Teach"
                                default:
                                    return null
                            }
                        }

                        const handleEditSkill = (e) => {
                            dispatch(toggleEditSkill([true, e.target.id]))
                        }

                        return (
                            <div className="bg-bg_navy w-full h-32 border-b-2 border-gray-300 flex flex-row items-center" key={index}>
                                <div className="px-8 py-5 border-r-2 border-gray-300 h-full flex items-center">
                                    <img className="h-14 w-14" src={item.photoURL} alt="" />
                                </div>
                                <div className={`p-5 ${target.includes('skills') ? 'w-[13%]' : 'w-[16%]'} border-r-2 border-gray-300 h-full flex items-center`}>
                                    <p className="font-bold cursor-pointer text-sm" onClick={() => { handleNavigateSkill() }}>
                                        {target.includes('skills') ? item.name : target == "people" ? item.displayName : item.projectName}
                                    </p>
                                </div>
                                <div className="p-5 w-[35%] border-r-2 border-gray-300 h-full flex items-center">
                                    <p className="text-sm">{target.includes('skills') ? item.description : target == "people" ? item.bio : item.description}</p>
                                </div>
                                {
                                    skillsRating ?
                                        <>
                                            <div className="p-5 w-[13%] border-r-2 border-gray-300 h-full flex items-center">
                                                <p className="text-white flex justify-center items-center text-sm">{convertRatingToString(currentRatings[index])}</p>
                                            </div>
                                            <div className="p-5 w-[10%] border-r-2 border-gray-300 h-full flex items-center">
                                                <p id={item.id} className="text-white flex justify-center items-center text-sm font-semibold cursor-pointer"
                                                    onClick={(e) => {handleEditSkill(e)}}>Edit skill</p>
                                            </div>
                                        </> :
                                        null
                                }
                            </div>
                        )
                    })}
            </>
        );
    }

    return (
        <div className={paginationStyle}>
            <Items currentItems={currentItems} target={target} />
            <ReactPaginate className="flex flex-row w-fit bg-bg_navy float-right mt-5"
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
                pageClassName=""
                activeLinkClassName="text-black bg-bg_light"
                pageLinkClassName="flex justify-center items-center w-12 h-12"
                previousClassName="flex justify-center items-center px-5"
                nextClassName="flex justify-center items-center px-5"
                breakClassName="flex justify-center items-center"
            />
        </div>
    );
}

// Add a <div id="container"> to your HTML to see the componend rendered.
// ReactDOM.render(
//   <Pagination itemsPerPage={4} />,
//   document.getElementById('container')
// );

export default Pagination
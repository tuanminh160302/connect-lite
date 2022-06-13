import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useNavigate } from "react-router";

const Pagination = ({ itemsPerPage, items, paginationStyle, target }) => {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
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
                            switch(target){
                                case 'skills':
                                    navigate(`/skills/${item.id}`)
                                    break
                                case 'people':
                                    navigate(`/people/${item.username}`)
                                    break
                                default:
                                    return null
                            }
                        }
                        
                        return (
                            <div className="bg-bg_navy w-full h-32 border-b-2 border-gray-300 flex flex-row items-center" key={index}>
                                <div className="px-8 py-5 border-r-2 border-gray-300 h-full flex items-center">
                                    <img className="h-14 w-14" src={item.photoURL} alt="" />
                                </div>
                                <div className="p-5 w-[15%] border-r-2 border-gray-300 h-full flex items-center">
                                    <p className="font-bold cursor-pointer" onClick={() => {handleNavigateSkill()}}>
                                        {target=="skills" ? item.name : target=="people" ? item.displayName : item.projectName}
                                    </p>
                                </div>
                                <div className="p-5 w-[35%] border-r-2 border-gray-300 h-full flex items-center">
                                    <p>{target=="skills" ? item.description : target=="people" ? item.bio : item.description}</p>
                                </div>
                            </div>
                        )
                    })}
            </>
        );
    }

    return (
        <div className={paginationStyle}>
            <Items currentItems={currentItems} target={target}/>
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
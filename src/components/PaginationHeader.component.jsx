const PaginationHeader = ({ target, className }) => {
    return (
        <div className={`${className} w-full h-14 border-b-2 bg-bg_navy_dark border-gray-300 flex flex-row items-center`}>
            <div className="px-8 py-4 border-r-2 border-gray-300 flex items-center h-full"><p className="text-white w-8 flex justify-center items-center text-xs">Logo</p></div>
            <div className={`p-5 ${target.includes('skills') ? 'w-[13%]' : 'w-[22%]'} border-r-2 border-gray-300 flex items-center h-full`}><p className="text-white flex justify-center items-center text-xs">Name</p></div>
            <div className="p-5 w-[25%] border-r-2 border-gray-300 flex items-center h-full"><p className="text-white flex justify-center items-center text-xs">Description</p></div>
            {
                target == "skills-profile" ?
                    <div className="p-5 w-[13%] border-r-2 border-gray-300 flex items-center h-full"><p className="text-white flex justify-center items-center text-xs">Rating</p></div> :
                    null
            }
        </div>
    )
}

export default PaginationHeader
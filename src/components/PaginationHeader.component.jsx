const PaginationHeader = ({ target }) => {
    return (
        <div className="w-full h-20 border-b-2 bg-bg_navy_dark border-gray-300 flex flex-row items-center">
            <div className="px-8 py-5 border-r-2 border-gray-300 h-full flex items-center"><p className="text-white w-14 flex justify-center items-center text-sm">Logo</p></div>
            <div className={`p-5 ${target.includes('skills') ? 'w-[10%]' : 'w-[15%]'} border-r-2 border-gray-300 h-full flex items-center`}><p className="text-white flex justify-center items-center text-sm">Name</p></div>
            <div className="p-5 w-[35%] border-r-2 border-gray-300 h-full flex items-center"><p className="text-white flex justify-center items-center text-sm">Description</p></div>
            {
                target == "skills-profile" ?
                    <div className="p-5 w-[13%] border-r-2 border-gray-300 h-full flex items-center"><p className="text-white flex justify-center items-center text-sm">Rating</p></div> :
                    null
            }
        </div>
    )
}

export default PaginationHeader
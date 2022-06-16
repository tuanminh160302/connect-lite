const DefaultModal = ({content, className, onClick}) => {
    return(
        <div onClick={onClick} className={`${className} p-8 bg-bg_navy rounded-md mb-4`}>
            {content}
        </div>
    )
}

export default DefaultModal
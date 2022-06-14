const DefaultModal = ({content, className, onClick}) => {
    return(
        <div onClick={onClick} className={`${className} px-12 py-12 bg-bg_navy rounded-2xl mb-4`}>
            {content}
        </div>
    )
}

export default DefaultModal
const DefaultModal = ({content, className, onClick}) => {
    return(
        <div onClick={onClick} className={`${className} px-10 py-8 bg-bg_navy rounded-2xl mb-4`}>
            {content}
        </div>
    )
}

export default DefaultModal
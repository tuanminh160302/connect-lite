const DefaultModal = ({content, className}) => {
    return(
        <div className={`${className} px-12 py-12 bg-bg_navy rounded-2xl mb-4 h-fit w-fit`}>
            {content}
        </div>
    )
}

export default DefaultModal
const OptionInModal = ({divStyle, SVG, description, SVGStyle, textStyle, onClick}) => {
    return (
        <div onClick={onClick} className={divStyle}>
            <SVG className={SVGStyle}/>
            <a className={textStyle}>{description}</a>
        </div>
    )
}

export default OptionInModal
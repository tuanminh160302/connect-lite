import { useState } from "react"
import DefaultModal from "./DefaultModal.component"
import { useSelector, useDispatch } from "react-redux/es/exports"
import { togglePopUp } from "../redux/popUp.slice"

const PopUpModal = ({content}) => {

    const show = useSelector(state => state.popup.show)
    const dispatch = useDispatch()

    return (
        <>
            {
                show ?
                    <div className="flex z-[46] justify-center items-center h-full w-full fixed top-0 left-0">
                        <div className="absolute h-full w-full top-0 left-0 bg-black_rgba" onClick={() => { dispatch(togglePopUp(false)) }}></div>
                        <DefaultModal className="z-10" content={content}/>
                    </div> : null
            }
        </>
    )
}

export default PopUpModal
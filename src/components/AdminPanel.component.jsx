import PopUpModal from "./PopupModal.component"
import CreateUser from "./create-form/CreateUser.component"
import DeleteUser from "./create-form/DeleteUser.component"

const AdminPanel = ({target, action}) => {
    return (
        <>
            <PopUpModal className="text-white text-sm" content={
                <>
                    <p className="text-base font-medium mb-4">{action} {target}</p>
                    {target=="user" && action=="Create" && <CreateUser />}
                    {target=="user" && action=="Delete" && <DeleteUser />}
                </>
            }/>
        </>
    )
}

export default AdminPanel
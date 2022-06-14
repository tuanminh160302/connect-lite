import PopUpModal from "./PopupModal.component"
import CreateUser from "./admin-form/CreateUser.component"
import DeleteUser from "./admin-form/DeleteUser.component"
import CreateSkill from "./admin-form/CreateSkill.component"

const AdminPanel = ({target, action}) => {
    return (
        <>
            <PopUpModal className="text-white text-sm" content={
                <>
                    <p className="text-base font-medium mb-4">{action} {target}</p>
                    {target=="user" && action=="Create" && <CreateUser />}
                    {target=="user" && action=="Delete" && <DeleteUser />}
                    {target=="skill" && action=="Create" && <CreateSkill />}
                </>
            }/>
        </>
    )
}

export default AdminPanel
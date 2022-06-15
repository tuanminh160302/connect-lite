import PopUpModal from "./PopupModal.component"
import CreateUser from "./admin-form/CreateUser.component"
import DeleteUser from "./admin-form/DeleteUser.component"
import CreateSkill from "./admin-form/CreateSkill.component"
import DeleteSkill from "./admin-form/DeleteSkill.component"

const AdminPanel = ({target, action}) => {
    return (
        <>
            <PopUpModal className="text-white text-sm" content={
                <>
                    <p className="text-sm font-medium mb-4">{action} {target}</p>
                    {target=="user" && action=="Create" && <CreateUser />}
                    {target=="user" && action=="Delete" && <DeleteUser />}
                    {target=="skill" && action=="Create" && <CreateSkill />}
                    {target=="skill" && action=="Delete" && <DeleteSkill />}
                </>
            }/>
        </>
    )
}

export default AdminPanel
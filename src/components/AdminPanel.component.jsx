import PopUpModal from "./PopupModal.component"
import CreateUser from "./admin-form/CreateUser.component"
import DeleteUser from "./admin-form/DeleteUser.component"
import CreateSkill from "./admin-form/CreateSkill.component"
import DeleteSkill from "./admin-form/DeleteSkill.component"
import UpdateSkill from "./admin-form/UpdateSkill.component"
import CreateCategory from "./admin-form/CreateCategory.component"

const AdminPanel = ({target, action}) => {
    return (
        <>
            <PopUpModal className="text-white text-xs" content={
                <>
                    <p className="text-xs font-medium mb-4">{action} {target}</p>
                    {target=="user" && action=="Create" && <CreateUser />}
                    {target=="user" && action=="Delete" && <DeleteUser />}
                    {target=="skill" && action=="Create" && <CreateSkill />}
                    {target=="skill" && action=="Delete" && <DeleteSkill />}
                    {target=="skill" && action=="Update" && <UpdateSkill />}
                    {target=="category" && action=="Create" && <CreateCategory />}
                </>
            }/>
        </>
    )
}

export default AdminPanel
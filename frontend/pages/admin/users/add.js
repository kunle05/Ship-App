import AddUser from "../../../components/admin/user/AddUser";
import AdminHeader from "../../../components/admin/AdminHeader";
import CheckLogIn from "../../../components/admin/user/CheckLogIn";

const NewUser = () => {
    return (
        <CheckLogIn>
            <AdminHeader />
            <AddUser />
        </CheckLogIn>
    );
};

export default NewUser;

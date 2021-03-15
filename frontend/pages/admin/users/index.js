import ManageUsers from "../../../components/admin/user/ManageUsers"
import AdminHeader from "../../../components/admin/AdminHeader";
import CheckLogIn from "../../../components/admin/user/CheckLogIn";

const Users = () => {
    return (
        <CheckLogIn>
            <AdminHeader />
            <ManageUsers />
        </CheckLogIn>
    );
};

export default Users;
import ManageUsers from "../../../components/admin/user/ManageUsers"
import AdminHeader from "../../../components/admin/AdminHeader";
import CheckLogIn from "../../../components/admin/user/CheckLogIn";
import { defaultLimit } from "../../../config";

const Users = ({ query }) => {
    const {limit, page} = query;

    return (
        <CheckLogIn>
            <AdminHeader />
            <ManageUsers page={parseInt(page) || 1} limit={parseInt(limit) || defaultLimit} />
        </CheckLogIn>
    );
};

export default Users;
import ASingleUser from "../../../components/admin/user/ASingleUser";
import AdminHeader from "../../../components/admin/AdminHeader";
import CheckLogIn from "../../../components/admin/user/CheckLogIn";

const User = ({query}) => {
    const { id } = query;
    return (
        <CheckLogIn>
            <AdminHeader />
            <ASingleUser id={id} />
        </CheckLogIn>
    );
};

export default User;
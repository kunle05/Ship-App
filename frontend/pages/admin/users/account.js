import UserAccount from "../../../components/admin/user/UserAccount"
import CheckLogIn from "../../../components/admin/user/CheckLogIn";
import AdminHeader from "../../../components/admin/AdminHeader";

const Account = () => {
    return (
        <CheckLogIn>
            <AdminHeader />
            <UserAccount />
        </CheckLogIn>

    );
};

export default Account;
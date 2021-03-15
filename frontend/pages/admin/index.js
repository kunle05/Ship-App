import SignIn from "../../components/admin/user/SignIn";
import AdminHeader from "../../components/admin/AdminHeader";
import CheckLogIn from "../../components/admin/user/CheckLogIn";

const index = () => {
    return (
        <CheckLogIn>
            <AdminHeader />
            <p>Our home page here</p>
        </CheckLogIn>
    );
};

export default index;
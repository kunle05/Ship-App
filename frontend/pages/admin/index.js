import AdminHeader from "../../components/admin/AdminHeader";
import CreatePackage from "../../components/admin/package/CreatePackage";
import CheckLogIn from "../../components/admin/user/CheckLogIn";

const index = () => {
    return (
        <CheckLogIn>
            <AdminHeader />
            <CreatePackage />
        </CheckLogIn>
    );
};

export default index;
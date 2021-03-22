import AddLocation from "../../../components/admin/location/AddLocation";
import AdminHeader from "../../../components/admin/AdminHeader";
import CheckLogIn from "../../../components/admin/user/CheckLogIn";

const NewUser = () => {
    return (
        <CheckLogIn>
            <AdminHeader />
            <AddLocation />
        </CheckLogIn>
    );
};

export default NewUser;
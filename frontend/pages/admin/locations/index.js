import ManageLocations from "../../../components/admin/location/ManageLocations"
import AdminHeader from "../../../components/admin/AdminHeader";
import CheckLogIn from "../../../components/admin/user/CheckLogIn";

const Locations = () => {
    return (
        <CheckLogIn>
            <AdminHeader />
            <ManageLocations />
        </CheckLogIn>
    );
};

export default Locations;
import ManageLocations from "../../../components/admin/location/ManageLocations"
import AdminHeader from "../../../components/admin/AdminHeader";
import CheckLogIn from "../../../components/admin/user/CheckLogIn";
import { defaultLimit } from "../../../config";

const Locations = ({ query }) => {
    const {limit, page} = query;

    return (
        <CheckLogIn>
            <AdminHeader />
            <ManageLocations page={parseInt(page) || 1} limit={parseInt(limit) || defaultLimit} />
        </CheckLogIn>
    );
};

export default Locations;
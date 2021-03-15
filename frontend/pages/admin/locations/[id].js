import Location from "../../../components/admin/location/Location";
import AdminHeader from "../../../components/admin/AdminHeader";
import CheckLogIn from "../../../components/admin/user/CheckLogIn";

const EditLocation = ({query}) => {
    const { id } = query

    return (
        <CheckLogIn>
            <AdminHeader />
            <Location id={id} />
        </CheckLogIn>
    );
};

export default EditLocation;
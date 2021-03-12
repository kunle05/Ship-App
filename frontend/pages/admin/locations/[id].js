import Location from "../../../components/admin/location/Location";
import AdminHeader from "../../../components/admin/Header";

const EditLocation = ({query}) => {
    const { id } = query

    return (
        <>
            <AdminHeader />
            <Location id={id} />
        </>
    );
};

export default EditLocation;
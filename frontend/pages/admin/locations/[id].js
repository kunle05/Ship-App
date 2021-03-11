import Location from "../../../components/admin/location/Location";

const EditLocation = ({query}) => {
    const { id } = query

    return (
        <Location id={id} />
    );
};

export default EditLocation;
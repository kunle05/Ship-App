import Location from "../../components/Location";

const LocationEdit = ({query}) => {
    const { id } = query

    return (
        <Location id={id} />
    );
};

export default LocationEdit;
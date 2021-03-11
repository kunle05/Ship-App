import SingleUser from "../../../components/admin/user/User";

const User = ({query}) => {
    const { id } = query;
    return (
        <SingleUser id={id} />
    );
};

export default User;
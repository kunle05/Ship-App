import SingleUser from "../../../components/admin/user/User";
import AdminHeader from "../../../components/admin/Header";

const User = ({query}) => {
    const { id } = query;
    return (
        <>
            <AdminHeader />
            <SingleUser id={id} />
        </>
    );
};

export default User;
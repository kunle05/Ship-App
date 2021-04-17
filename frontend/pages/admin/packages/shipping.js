import AdminHeader from "../../../components/admin/AdminHeader";
import Shipping from "../../../components/admin/package/Shipping";
import CheckLogIn from "../../../components/admin/user/CheckLogIn";

const Ship = () => {
    return (
        <CheckLogIn>
            <AdminHeader />
            <Shipping />
        </CheckLogIn>            
    );
};

export default Ship;
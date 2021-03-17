import PasswordReset from "../../components/admin/PasswordReset";

const Resetpassword = ({ query }) => {
    const { resetToken } = query;

    return (
        <PasswordReset token={resetToken} />
    );
};

export default Resetpassword;
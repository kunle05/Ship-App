import { useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./CurrentUser";
import SignIn from "./SignIn";

const CheckLogIn = props => {
    const { loading, data } = useQuery(CURRENT_USER_QUERY);
    if(loading) return <p>loading...</p>
    if(!data || !data.me) return <SignIn />

    return (
        <>
            {props.children}
        </>
    );
};

export default CheckLogIn;
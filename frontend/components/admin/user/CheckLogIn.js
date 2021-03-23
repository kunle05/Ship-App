import { gql, useQuery } from "@apollo/client";
import SignIn from "./SignIn";

export const CURRENT_USER_QUERY = gql`
    query CURRENT_USER_QUERY {
        me {
            _id
            username
            firstname
            lastname
            email
            permissions
            photo
            location {
                _id
                city
            }
        }
    }
`;

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
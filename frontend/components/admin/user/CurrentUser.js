import { gql, useQuery } from "@apollo/client";

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
        }
    }
`;

export const CurrentUser = () => {
    const { data: { me } } = useQuery(CURRENT_USER_QUERY);
    return me;
};
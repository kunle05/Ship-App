import { gql, useQuery } from "@apollo/client";
import { Table } from "reactstrap";

const USER_QUERY = gql`
    query USER_QUERY($id: ID!) {
        user(_id: $id) {
            _id
            firstname
            lastname
            photo
            username
            email
            active
            permissions
            location {
                _id
                city
            }
            lastLogin
            createdAt
        }
    }
`;

const SingleUser = ({id}) => {
    const { loading, error, data } = useQuery(USER_QUERY, { variables: { id } });
    if(loading) return <p>loading</p>
    if(error) return <p>{ error.message }</p>

    const { user } = data;

    return (
        <div>
            <img src={user.photo || '/static/photodefault.jpg'} alt={user.username} width="150" />
            <Table>
                <tbody>
                    <tr>
                        <td>Email:</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>User since</td>
                        <td>{user.email}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default SingleUser;
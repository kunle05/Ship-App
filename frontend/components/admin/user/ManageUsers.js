import { gql, useQuery } from "@apollo/client";
import Link from 'next/link';
import { Table } from "reactstrap";
import StyledTableDiv from "../../styles/StyledTableDiv";

export const USERS_QUERY = gql`
    query USERS_QUERY {
        users {
            _id
            firstname
            lastname
            photo
            username
            email
            active
            permissions
            location {
                city
            }
            lastLogin
        }
    }
`;

const ManageUsers = () => {
    const { loading, error, data } = useQuery(USERS_QUERY);
    if(loading) return <p>loading</p>
    if(error) return <p>{ error.message }</p>

    return (
        <StyledTableDiv>
            <div className="table-responsive">
                <Table striped hover>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Username</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Status</td>
                            <td>Level</td>
                            <td>Location</td>
                            <td>Last Login</td>
                        </tr>
                    </thead>
                    <tbody>
                        { data.users.map(user => (
                            <Link href={`/admin/users/${user._id}`} key={user._id}>
                                <tr className="clickable">
                                    <td>
                                        <img src={user.photo || '/static/photodefault.jpg'} alt={user.username} height="30" />
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{`${user.firstname} ${user.lastname}`}</td>
                                    <td>{user.email}</td>
                                    <td>{user.active ? 'Active' : <span style={{color: 'var(--red)'}}>Disabled</span>}</td>
                                    <td>{user.permissions[user.permissions.length - 1]}</td>
                                    <td>{user.location.city}</td>
                                    <td>{user.lastLogin || 'Never Logged In'}</td>
                                </tr>
                            </Link>
                        )) }
                    </tbody>
                </Table>
            </div>
        </StyledTableDiv>
    );
};

export default ManageUsers;
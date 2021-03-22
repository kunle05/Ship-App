import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import Link from 'next/link';
import { Row, Table } from "reactstrap";
import Pagination from "../Pagination";
import StyledTableDiv from "../../styles/StyledTableDiv";

export const USERS_QUERY = gql`
    query USERS_QUERY($skip: Int, $limit: Int) {
        users(skip: $skip, limit: $limit) {
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

const ManageUsers = ({ page, limit }) => {
    const { loading, error, data } = useQuery(USERS_QUERY, {
        variables: {
            skip: limit * page - limit,
            limit: limit 
        }
    });
    if(loading) return <p>loading</p>
    if(error) return <p>{ error.message }</p>

    return (
        <StyledTableDiv>
            <Row className="justify-content-between">
                <div>
                    <h2>Users Manager</h2>
                    <p>Create, edit and manage users permissions</p>
                </div>
                <Link href="/admin/users/add">
                    <a className="btn">
                        <FontAwesomeIcon icon="user-plus" /> 
                        Create New User!
                    </a>
                </Link>
            </Row>
            <div className="table-responsive">
                <Pagination sender="users" page={page} limit={limit} />
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
                                    <td style={{width: '55px'}}>
                                        <img src={user.photo || '/static/photodefault.jpg'} alt={user.username} width="50" />
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{`${user.firstname} ${user.lastname}`}</td>
                                    <td>{user.email}</td>
                                    <td>{user.active ? 'Active' : <span style={{color: 'var(--red)'}}>Suspended</span>}</td>
                                    <td>{
                                        user.permissions.includes("ADMIN") ? "ADMIN" :
                                        user.permissions.includes("MANAGER") ? "MANAGER" : "USER"
                                    }</td>
                                    <td>{user.location.city}</td>
                                    <td>{format(new Date(user.lastLogin), "MMM d yyyy, h:mm a")  || 'Never Logged In'}</td>
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
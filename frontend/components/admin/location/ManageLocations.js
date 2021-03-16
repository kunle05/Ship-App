import { useQuery, gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { format } from 'date-fns';
import { LOCATIONS_QUERY } from '../../Locations'; 
import { CURRENT_USER_QUERY } from '../user/CheckLogIn';
import StyledTableDiv from '../../styles/StyledTableDiv';
import SafeButton from "../../styles/SafeButton";
import AddLocation from './AddLocation';
import Pagination from '../Pagination';

const UPDATE_LOCATION = gql`
    mutation UPDATE_LOCATION($_id: ID!) {
        updateLocation(_id: $_id) {
            _id
            active
        }
    }
`;

const ManageLocations = () => {
    const { data: { me } } = useQuery(CURRENT_USER_QUERY);

    const [newMode, setNewMode] = useState(false);
    const { loading, error, data } = useQuery(LOCATIONS_QUERY);
    const [updateLocation, { loading: updateLoading }] = useMutation(UPDATE_LOCATION);
    const update = id => {
        updateLocation({ variables: { _id: id } });
    }
    const toggle = () => {
        setNewMode(!newMode);
    }

    if(loading) return <p>loading</p>
    if(error) return <p>{ error.message }</p>

    if(newMode) {
        return (
            <AddLocation toggle={toggle} />
        )
    }

    return (
        <StyledTableDiv>
            { me.permissions.includes("ADMIN") ? <>
                <Row className="justify-content-between">
                    <div>
                        <h2>Locations Manager</h2>
                        <p>Create, edit and disable locations</p>
                    </div>
                    <SafeButton onClick={toggle}><FontAwesomeIcon icon="plus" /> New Location</SafeButton>
                </Row>
                <div className="table-responsive">
                    <Pagination sender="location" />
                    <Table striped hover>
                        <thead>
                            <tr>
                                <td></td>
                                <td>Location</td>
                                <td>Description</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Date Created</td>
                                <td>Last Modified</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody className="table-bordered">
                            { data.locations.map(location => (
                                <tr key={location._id}>
                                    <td>
                                        <img src={location.photo || "/static/photodefault.jpg"} alt={location.city} height="30" />
                                    </td>
                                    <td>
                                        <Link href={`/admin/locations/${location._id}`}>
                                            {location.city}
                                        </Link> 
                                    </td>
                                    <td className="desc">{ location.description }</td>
                                    <td>{ location.email }</td>
                                    <td>{ location.phone }</td>
                                    <td>{ format(new Date(location.createdAt), "MMM d, yyyy h:mm a") }</td>
                                    <td>{ format(new Date(location.updatedAt), "MMM d, yyyy h:mm a") }</td>
                                    <td>
                                        <SafeButton onClick={e => update(location._id)} active={!location.active} disabled={updateLoading}>
                                            { location.active ? "DIS" : "EN" }ABLE
                                        </SafeButton>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </Table>
                </div>
                </> : <p>You don not have the required permissions to view this page</p>
            }
        </StyledTableDiv>
    );
};

export default ManageLocations;
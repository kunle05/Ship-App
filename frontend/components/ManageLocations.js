import { useQuery, gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { format } from 'date-fns';
import { LOCATIONS_QUERY } from './Locations'; 
import LocationTable from './styles/ManagedLocation';
import SafeButton from "./styles/SafeButton";
import AddLocation from './AddLocation';

const UPDATE_LOCATION = gql`
    mutation UPDATE_LOCATION($_id: ID!) {
        updateLocation(_id: $_id) {
            _id
            active
        }
    }
`;

const ManageLocations = () => {
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
        <LocationTable>
        <SafeButton onClick={toggle}><FontAwesomeIcon icon="plus" /> New Location</SafeButton>
        <div className="table-responsive">
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
                            <Link href={`/locations/${location._id}`}>
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
        </LocationTable>
    );
};

export default ManageLocations;
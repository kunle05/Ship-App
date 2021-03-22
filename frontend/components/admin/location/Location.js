import { gql, useMutation, useQuery } from "@apollo/client";
import { format, formatDistanceToNow } from "date-fns";
import { useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from 'reactstrap';
import { LOCATIONS_QUERY } from '../../Locations'; 
import SingleItemDiv from "../../styles/SingleItemDiv";
import useForm from "../../../lib/useForm";
import EditLocation from "./EditLocation";

const LOCATION_QUERY = gql`
    query LOCATION_QUERY($id: ID!) {
        location(_id: $id) {
            _id
            photo
            city
            address
            description
            phone
            email
            active
            createdAt
            updatedAt
        }
    }
`;

export const LOCATION_EDIT_MUTATION = gql`
    mutation LOCATION_EDIT_MUTATION($id: ID!, $photo: String, $city: String, $address: String, $description: String, $phone: String, $email: String) {
        editLocation(_id: $id, photo: $photo, city: $city, address: $address, description: $description, phone: $phone, email: $email) {
            _id
        }
    }
`;

const Location = ({id}) => {
    const { error, loading, data } = useQuery(LOCATION_QUERY, { variables: { id } });
    const { formData, handleChange, resetForm } = useForm(data?.location);
    const [ locationEdit, {loading : changeLoading} ] = useMutation(LOCATION_EDIT_MUTATION, { 
        variables: { id, ...formData }, 
        refetchQueries: [{query: LOCATIONS_QUERY}]
    });
    let inputElement = useRef(null);

    if(loading) return <p>loading</p>
    if(error) return <p>{ error.message }</p>
    const { location } = data;

    const saveImgToDB = async () => {
        await locationEdit();
        resetForm();
    }
    if(formData.photo) {
        saveImgToDB();
    }

    return (
        <SingleItemDiv>
            <Container className="col-md-6">
                <div className="title_header">
                    <h2>
                        <Link href="/admin/locations">Locations Manager</Link>
                        <FontAwesomeIcon icon="caret-right" />
                        {location.city}
                    </h2>
                    <p>Editing location - {location.city}</p>
                </div>
                <div className="text-center">
                    <img src={location.photo || "/static/photodefault.jpg"} alt={location.city} height="150" onClick={e => inputElement.click()} />
                    <FontAwesomeIcon icon="edit" onClick={e => inputElement.click()} />
                    <input type="file" name="photo" onChange={handleChange} style={{display: 'none'}} ref={(input) => inputElement = input} />
                    <h3>{location.city}</h3>
                    <p className="info"><span>Opened since</span> <b>{ format( new Date(location.createdAt), "MMM d, yyyy")}</b></p>
                    <p className="info"><span>Last Modified:</span> <b>{ formatDistanceToNow( new Date(location.updatedAt) )} ago</b></p>
                </div>
                <EditLocation location={location} />
            </Container>
        </SingleItemDiv>
    );
};

export default Location;
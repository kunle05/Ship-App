import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FormGroup, Label, Input } from 'reactstrap';
import { LOCATIONS_QUERY } from '../../Locations'; 
import useForm from "../../../lib/useForm";
import SafeButton from "../../styles/SafeButton";
import Form from "../../styles/Form";

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
        }
    }
`;

const LOCATION_EDIT_MUTATION = gql`
    mutation LOCATION_EDIT_MUTATION($id: ID!, $city: String, $address: String, $description: String, $phone: String, $email: String) {
        editLocation(_id: $id, city: $city, address: $address, description: $description, phone: $phone, email: $email) {
            _id
        }
    }
`;

const Location = ({id}) => {
    const { error, loading, data } = useQuery(LOCATION_QUERY, { variables: { id } });
    const { formData, handleChange, clearForm } = useForm(data?.location);
    const [ locationEdit ] = useMutation(LOCATION_EDIT_MUTATION, { 
        variables: { id, ...formData }, 
        refetchQueries: [{query: LOCATIONS_QUERY}]
    });
    const router = useRouter();

    if(loading) return <p>loading</p>
    if(error) return <p>{ error.message }</p>
    const { location } = data;

    const handleSubmit = async e => {
        e.preventDefault();
        await locationEdit();
        clearForm();
        router.push("admin/locations/");
    }

    return (
        <Form method="POST" onSubmit={handleSubmit} className="container col-md-6">
            <fieldset disabled={loading} aria-busy={loading}> 
                <FormGroup>
                    <Label for="city">City</Label>
                    <Input type="text" name="city" defaultValue={location.city} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" name="address" defaultValue={location.address} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="textarea" name="description" rows="3" defaultValue={location.description} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" defaultValue={location.email} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="text" name="phone" defaultValue={location.phone} onChange={handleChange} />
                </FormGroup>
                <div className="d-flex justify-content-end">
                    <SafeButton className="cancel" type="button" onClick={() => router.back()}>Cancel</SafeButton>
                    <SafeButton type="submit">Sav{loading ? 'ing' : 'e'} Changes</SafeButton>
                </div>
            </fieldset>
        </Form>
    );
};

export default Location;
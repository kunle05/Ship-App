import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormGroup, Label, Input } from 'reactstrap';
import { LOCATION_EDIT_MUTATION } from './Location';
import { LOCATIONS_QUERY } from '../../Locations'; 
import SafeButton from "../../styles/SafeButton";
import Form from "../../styles/Form";
import useForm from "../../../lib/useForm";

const EditLocation = ({ location }) => {
    const { formData, handleChange, resetForm } = useForm();
    const [ locationEdit, {loading}] = useMutation(LOCATION_EDIT_MUTATION, { 
        variables: { id: location._id, ...formData }, 
        refetchQueries: [{query: LOCATIONS_QUERY}]
    });
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        await locationEdit();
        resetForm();
        router.push("admin/locations/");
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
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

export default EditLocation;
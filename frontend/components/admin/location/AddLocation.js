import { gql, useMutation } from "@apollo/client";
import { FormGroup, Label, Input, Button } from 'reactstrap';
import SafeButton from "../../styles/SafeButton";
import useForm from "../../../lib/useForm";
import Form from "../../styles/Form";

const CREATE_LOCATION_MUTATION = gql`
    mutation CREATE_LOCATION_MUTATION($city: String!, $address: String!, $description: String, $phone: String, $email: String) {
        newLocation(city: $city, address: $address, description: $description, phone: $phone, email: $email) {
            _id
        }
    }
`;

const AddLocation = ({toggle}) => {
    const {formData, handleChange, resetForm} = useForm({
        city: "",
        address: "",
        description: "",
        phone: "",
        email: ""
    });
    const [create, { error, loading }] = useMutation(CREATE_LOCATION_MUTATION, { 
        variables: formData,
        update(cache, { data: { newLocation }}) {
            cache.modify({
                fields: {
                    locations(existingItems = []) {
                        const newItem = cache.writeFragment({
                            data: newLocation,
                            fragment: gql`
                                fragment NewItem on Item {
                                    id
                                    type
                                }
                            `
                        });
                        return [...existingItems, newItem];
                    }
                }
            });
        } 
    })

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await create();
        console.log(res);
        resetForm();
        toggle();
    }

    return (
        <Form method="POST" onSubmit={handleSubmit} className="container col-md-5">
            <Button close aria-label="Cancel" onClick={e => {resetForm(); toggle()}}>
              <span aria-hidden>Cancel</span>
            </Button>
            <h2>Add{loading ? 'ing' : null} new location</h2>
            <fieldset disabled={loading} aria-busy={loading}>
                <FormGroup>
                    <Label for="city">City</Label>
                    <Input type="text" name="city" value={formData.city} onChange={handleChange} required="true" />
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" name="address" value={formData.address} onChange={handleChange} required="true" />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="textarea" name="description" rows="3" value={formData.description} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </FormGroup>
                <SafeButton type="submit">Creat{loading ? 'ing' : 'e'} Location</SafeButton>
            </fieldset>
        </Form>
    );
};

export default AddLocation;
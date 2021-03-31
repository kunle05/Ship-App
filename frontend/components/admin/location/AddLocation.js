import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, FormGroup, Label, Input, FormText } from 'reactstrap';
import { PAGINATION_QUERY } from "../Pagination";
import Link from "next/link";
import SingleItemDiv from "../../styles/SingleItemDiv";
import SafeButton from "../../styles/SafeButton";
import useForm from "../../../lib/useForm";
import Form from "../../styles/Form";

const CREATE_LOCATION_MUTATION = gql`
    mutation CREATE_LOCATION_MUTATION($city: String!, $address: String!, $description: String, $phone: String, $email: String, $photo: String) {
        newLocation(city: $city, address: $address, description: $description, phone: $phone, email: $email, photo: $photo) {
            _id
        }
    }
`;

const AddLocation = () => {
    const router = useRouter();
    const {formData, handleChange, resetForm} = useForm({
        city: "",
        address: "",
        description: "",
        phone: "",
        email: "",
        photo: "",
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
                        return [newItem, ...existingItems];
                    }
                }
            });
        },
        refetchQueries: [
            {query: PAGINATION_QUERY, variables: {sender: "locations"}}
        ] 
    })

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await create();
        resetForm();
        router.push("/admin/locations/");
    }

    return (
        <SingleItemDiv>
            <Container className="col-md-6">
                <div className="title_header">
                    <h2>
                        <Link href="/admin/locations">Locations Manager</Link>
                        <FontAwesomeIcon icon="caret-right" />
                        Add{loading ? 'ing' : null} Location
                    </h2>
                    <p>Create a new location</p>
                </div>
                <Form method="POST" onSubmit={handleSubmit}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        { formData.photo && <img width="200" src={formData.photo} alt="Upload Preview" /> }
                        <FormGroup>
                            <Label for="image">Upload{ formData.photo ? 'ed' : '' } Image</Label>
                            <Input type="file" name="photo" onChange={handleChange} />
                            <FormText color="muted">Maximum file size - 5MB</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input type="text" name="city" value={formData.city} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
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
                        <div className="d-flex justify-content-end">
                            <SafeButton className="cancel" type="button" onClick={() => {resetForm(); router.push("/admin/locations/");}}>Cancel</SafeButton>
                            <SafeButton type="submit">Add{loading ? 'ing' : null} Location!</SafeButton>
                        </div>
                    </fieldset>
                </Form>
            </Container>
        </SingleItemDiv>
    );
};

export default AddLocation;
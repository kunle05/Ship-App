import { gql, useQuery, useMutation } from "@apollo/client";
import { LOCATIONS_QUERY } from '../../Locations'; 
import { FormGroup, Label, Input } from 'reactstrap';
import SafeButton from "../../styles/SafeButton";
import useForm from "../../../lib/useForm";
import Form from "../../styles/Form";
import { useRouter } from "next/dist/client/router";

const CREATE_USER_MUTATION = gql`
    mutation CREATE_USER_MUTATION($firstname: String!, $lastname: String!, $username: String!, $email: String!, $password: String!, $confirmPassword: String!, $location: ID! ) {
        newUser(firstname: $firstname, lastname: $lastname, username: $username, email: $email, password: $password, confirmPassword: $confirmPassword, location: $location) {
            _id
            firstname
            lastname
            location {
                _id
                city
            }
        }
    }
`;

const AddUser = () => {
    const router = useRouter();
    const { loading, error, data } = useQuery(LOCATIONS_QUERY);
    const {formData, handleChange, resetForm} = useForm({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: ""
    });
    const [create, { error : creatingError, loading : creating }] = useMutation(CREATE_USER_MUTATION, { 
        variables: formData,
        update(cache, { data: { newUser }}) {
            cache.modify({
                fields: {
                    users(existingItems = []) {
                        const newItem = cache.writeFragment({
                            data: newUser,
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
        await create();
        resetForm();
        router.back();
    }

    if(loading) return <p>loading</p>
    if(error) return <p>{ error.message }</p>
    const { locations } = data;

    return (
        <Form method="POST" onSubmit={handleSubmit} className="container col-md-5">
            <h2>Add{creating ? 'ing' : null} new user</h2>
            <fieldset disabled={creating} aria-busy={creating}>
                <FormGroup>
                    <Label for="firstname">First Name</Label>
                    <Input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="lastname">Last Name</Label>
                    <Input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="location">Location</Label>
                    <Input type="select" name="location" value={formData.location} onChange={handleChange} required>
                        <option value="">Choose...</option>
                        { locations.map(location => (
                            <option key={location._id} value={location._id} >{location.city}</option>
                        )) }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </FormGroup>
                <div className="d-flex justify-content-end">
                    <SafeButton className="cancel" type="button" onClick={() => router.back()}>Cancel</SafeButton>
                    <SafeButton type="submit">Add{creating ? 'ing' : null} User!</SafeButton>
                </div>
            </fieldset>
        </Form>
    );
};

export default AddUser;
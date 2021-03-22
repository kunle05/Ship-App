import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormGroup, Label, Input, Row } from 'reactstrap';
import { USERS_QUERY } from "./ManageUsers";
import SafeButton from "../../styles/SafeButton";
import useForm from "../../../lib/useForm";
import Form from "../../styles/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EDIT_USER = gql`
    mutation EDIT_USER($id: ID!, $username: String, $firstname: String, $lastname: String, $email: String, $photo: String $permissions: [Permission]) {
        editUser(_id: $id, username: $username, firstname: $firstname, lastname: $lastname, email: $email, photo: $photo, permissions: $permissions) {
            _id
            permissions
            updatedAt
        }
    }
`;

const EditUser = ({ user }) => {
    const { formData, handleChange } = useForm();
    const [editUser, { loading, data }] = useMutation(EDIT_USER, { 
        variables: { id: user._id, ...formData },
        refetchQueries: [{query: USERS_QUERY}] 
    });
    const router = useRouter();
    
    return (
        <Form method="POST" onSubmit={async e => {
            e.preventDefault();
            await editUser();
        }}>
            { data?.editUser && <Row className="notify">
                <FontAwesomeIcon icon="check-circle" />
                <div>
                    <p>Success!</p>
                    <p>Your profile has been saved.</p>
                </div>
            </Row>}
            <fieldset disabled={loading} aria-busy={loading}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" defaultValue={user.username} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="firstname">First Name</Label>
                    <Input type="text" name="firstname" defaultValue={user.firstname} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="lastname">Last Name</Label>
                    <Input type="text" name="lastname" defaultValue={user.lastname} onChange={handleChange} required />
                </FormGroup>
                {
                    user.permissions.includes("ADMIN") && <>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" defaultValue={user.email} onChange={handleChange} required />
                        </FormGroup>
                        <div className="d-flex justify-content-end">
                            <SafeButton className="cancel" type="button" onClick={() => router.push("/admin/users/")}>Cancel</SafeButton>
                            <SafeButton type="submit">Sav{loading ? 'ing' : 'e'} Changes</SafeButton>
                        </div>
                    </>
                }
                {
                    !user.permissions.includes("ADMIN") && <>
                        <div className="d-flex justify-content-end">
                            <SafeButton className="cancel" type="button" onClick={() => router.push("/admin/")}>Cancel</SafeButton>
                            <SafeButton type="submit">Sav{loading ? 'ing' : 'e'} Changes</SafeButton>
                        </div>
                    </>
                }
            </fieldset>
        </Form>
    );
};

export default EditUser;
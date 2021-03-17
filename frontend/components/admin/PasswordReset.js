import { gql, useMutation } from "@apollo/client";
import { Container, FormGroup, Input, Label } from "reactstrap";
import AdminHeader from "./AdminHeader";
import useForm from "../../lib/useForm";
import Form from "../styles/Form";
import SafeButton from "../styles/SafeButton";
import SingleItemDiv from "../styles/SingleItemDiv";

const RESET_PW_MUTATION = gql`
    mutation RESET_PW_MUTATION($token: String!, $password: String!, $confirmPassword: String!) {
        resetPassword(token: $token, password: $password, confirmPassword: $confirmPassword) {
            message
        }
    }
`;

const PasswordReset = ({ token }) => {
    const { formData, handleChange, resetForm } = useForm({
        password: "",
        confirmPassword: ""
    });
    const [beginReset, {loading, error}] = useMutation(RESET_PW_MUTATION, { 
        variables: {
            token,
            ...formData
        } 
    });

    return (
        <>
        <AdminHeader />
        <SingleItemDiv>
            <Container className="col-md-6">
                <div className="title_header">
                    <h2>Create new password!</h2>
                    <p>Password must be a minimum of eight characters with at least one number and one letter.</p>
                </div>
                <Form method="POST" onSubmit={async e => {
                    e.preventDefault();
                    await beginReset();
                    resetForm();
                }}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <FormGroup>
                            <Label for="password"><b>New Password</b></Label>
                            <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword"><b>Confirm Password</b></Label>
                            <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                        </FormGroup>
                        <div className="d-flex justify-content-end">
                            <SafeButton type="submit">Submit</SafeButton>
                        </div>
                    </fieldset>
                </Form>
            </Container>
        </SingleItemDiv>
        </>
    );
};

export default PasswordReset;
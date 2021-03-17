import { gql, useMutation } from "@apollo/client";
import { FormGroup, Input, Label } from "reactstrap";
import useForm from "../../lib/useForm";
import Form from "../styles/Form";
import SafeButton from "../styles/SafeButton";

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
    );
};

export default PasswordReset;
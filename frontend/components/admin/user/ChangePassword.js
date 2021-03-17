import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { FormGroup, Label, Input } from 'reactstrap';
import Form from '../../styles/Form';
import SafeButton from '../../styles/SafeButton';

const CHANGE_USER_PASS = gql`
    mutation CHANGE_USER_PASS($id: ID!, $password: String!, $confirmPassword: String!) {
        changeUserPass(_id: $id, password: $password, confirmPassword: $confirmPassword) {
            _id
            username
            active
            updatedAt
        }
    }
`;

const ChangePassword = ({resetMode, id}) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changePassword, { loading }] = useMutation(CHANGE_USER_PASS, {variables: {
        id,
        password,
        confirmPassword
    }})

    const toggle = () => {
        resetMode();
    }

    const resetPassword = async e => {
        e.preventDefault();
        await changePassword();
        setPassword("");
        setConfirmPassword("");
        toggle();
    }

    return (
        <Form method="POST" onSubmit={resetPassword}>
            <fieldset disabled={loading} aria-busy={loading}>
                <FormGroup>
                    <Label for="password"><b>New Password</b></Label>
                    <Input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword"><b>Confirm Password</b></Label>
                    <Input type="password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </FormGroup>
                <div className="d-flex justify-content-end">
                    <SafeButton type="button" className="cancel" onClick={toggle}>Cancel</SafeButton>
                    <SafeButton type="submit">Submit</SafeButton>
                </div>
            </fieldset>
        </Form>
    );
};

export default ChangePassword;
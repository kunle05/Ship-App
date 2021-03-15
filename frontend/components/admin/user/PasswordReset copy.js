import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
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

const PasswordReset = ({open, resetMode, id}) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changePassword] = useMutation(CHANGE_USER_PASS, {variables: {
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
        <Modal isOpen={open} >
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
                <Form method="POST" onSubmit={resetPassword} style={{margin: '0'}}>
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
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default PasswordReset;
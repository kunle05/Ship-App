import { gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Container, FormGroup, Label, Input } from 'reactstrap';
import useForm from '../../../lib/useForm';
import Form from "../../styles/Form";
import SafeButton from "../../styles/SafeButton";
import SingleItemDiv from "../../styles/SingleItemDiv";
import AdminHeader from "../AdminHeader";
import { CURRENT_USER_QUERY } from "./CheckLogIn";

const SIGN_IN_MUTATION = gql`
    mutation SIGN_IN_MUTATION($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
            _id
        }
    }
`;

const SignIn = () => {
    const [mode, setMode] = useState({
        login: true,
        password: false
    });
    const { formData, handleChange, resetForm } = useForm({
        username: "",
        password: ""
    });
    const [login, {loading, error}] = useMutation(SIGN_IN_MUTATION, { 
        variables: formData, 
        refetchQueries: [{
            query: CURRENT_USER_QUERY
        }] 
    });

    const handleSubmit = async e => {
        e.preventDefault();
        await login();
        resetForm();
    }

    return (
        <>
        <AdminHeader />
        <SingleItemDiv>
            { mode.login && <Container className="col-md-6">
                <div className="title_header">
                    <h2>Sign in to your account!</h2>
                </div>
                <Form method="POST" onSubmit={handleSubmit}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" value={formData.username} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </FormGroup>
                        <div className="d-flex justify-content-between">
                            <a className="safelink" onClick={() => setMode({login: false, password: true})}>Reset Password</a>
                            <SafeButton type="submit">Log{loading ? 'ging' : null} In!</SafeButton>
                        </div>
                    </fieldset>
                </Form>
            </Container> }

            { mode.password && <Container className="col-md-6">
                <div className="title_header">
                    <h2>Reset Password</h2>
                    <p>Password reset instructions will be emailed to the address entered below.</p>
                </div>
                <Form method="POST" onSubmit={handleSubmit}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </FormGroup>
                        <div className="d-flex justify-content-between">
                            <a className="safelink" onClick={() => setMode({login: true, password: false})}>
                                <FontAwesomeIcon icon="angle-double-left" />
                                Back to Login</a>
                            <SafeButton type="submit">Submit{loading ? 'ting' : null}!</SafeButton>
                        </div>
                    </fieldset>
                </Form>
            </Container>}
        </SingleItemDiv>
        </>
    );
};

export default SignIn;
import { gql, useMutation, useQuery } from "@apollo/client";
import { format, formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormGroup, Label, Input } from 'reactstrap';
import { USERS_QUERY } from "./ManageUsers";
import PasswordReset from "./PasswordReset";
import Permission from "./Permission";
import useForm from "../../../lib/useForm";
import Form from "../../styles/Form";
import SafeButton from "../../styles/SafeButton";

export const USER_QUERY = gql`
    query USER_QUERY($id: ID!) {
        user(_id: $id) {
            _id
            firstname
            lastname
            photo
            username
            email
            active
            permissions
            location {
                _id
                city
            }
            lastLogin
            createdAt
            updatedAt
        }
    }
`;

const UPDATE_USER = gql`
    mutation UPDATE_USER($id: ID!) {
        updateUser(_id: $id) {
            _id
            active
        }
    }
`;

export const EDIT_USER = gql`
    mutation EDIT_USER($id: ID!, $username: String, $firstname: String, $lastname: String, $email: String, $permissions: [Permission]) {
        editUser(_id: $id, username: $username, firstname: $firstname, lastname: $lastname, email: $email, permissions: $permissions) {
            _id
        }
    }
`;

const SingleUser = ({id}) => {
    const [ mode, setMode ] = useState({
        passwordMode: false,
        permissionMode: false,
    });
    const { loading, error, data } = useQuery(USER_QUERY, { variables: { id } });
    const [updateUser] = useMutation(UPDATE_USER, { variables: { id } });
    const { formData, handleChange } = useForm(data?.user);
    const [editUser] = useMutation(EDIT_USER, { 
        variables: { id, ...formData },
        refetchQueries: [{query: USERS_QUERY}] 
    });
    const router = useRouter();
    
    if(loading) return <p>loading</p>
    if(error) return <p>{ error.message }</p>
    const { user } = data;

    const showDefault = () => {
        setMode({
            passwordMode: false,
            permissionMode: false,
        })
    }

    return (
        <div>
            <img src={user.photo || '/static/photodefault.jpg'} alt={user.username} width="150" />
            <p>{`${user.firstname} ${user.lastname}`}</p>
            <p>Active since <b>{ format( new Date(user.createdAt), "MMM d, yyyy")}</b></p>
            <p>Last Logged In: <b>{ user.lastLogin ? `${formatDistanceToNow( new Date(user.lastLogin) )} ago` : 'Never'}</b></p>
            <p>Last Modified: <b>{ formatDistanceToNow( new Date(user.updatedAt) )} ago</b></p>

            <SafeButton onClick={updateUser} active={!user.active} disabled={loading}>
                { user.active ? "SUSPEND" : "ENABLE" }
            </SafeButton>
            <SafeButton onClick={e => setMode({...mode, permissionMode: true})}>
                Set Permissions
            </SafeButton>
            <SafeButton onClick={e => setMode({...mode, passwordMode: true})}>
                Reset Password
            </SafeButton>

            <Form method="POST" onSubmit={async e => {
                e.preventDefault();
                await editUser();
            }}>
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
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" defaultValue={user.email} onChange={handleChange} required />
                    </FormGroup>
                    <div className="d-flex justify-content-end">
                        <SafeButton className="cancel" type="button" onClick={() => router.back()}>Cancel</SafeButton>
                        <SafeButton type="submit">Sav{loading ? 'ing' : 'e'} Changes</SafeButton>
                    </div>
                </fieldset>
            </Form>
            <PasswordReset open={mode.passwordMode} resetMode={showDefault} id={user._id} />
            <Permission open={mode.permissionMode} resetMode={showDefault} user={user} />
        </div>
    );
};

export default SingleUser;
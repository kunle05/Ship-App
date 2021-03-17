import { gql, useMutation, useQuery } from "@apollo/client";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row } from 'reactstrap';
import ChangePassword from "./ChangePassword";
import Permission from "./Permission";
import SafeButton from "../../styles/SafeButton";
import SingleItemDiv from "../../styles/SingleItemDiv";
import EditUser from "./EditUser";

const SINGLE_USER_QUERY = gql`
    query SINGLE_USER_QUERY($id: ID!) {
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
            updatedAt
        }
    }
`;

const ASingleUser = ({id}) => {
    const [ mode, setMode ] = useState({
        editMode: true,
        passwordMode: false,
        permissionMode: false,
    });
    const { loading, error, data } = useQuery(SINGLE_USER_QUERY, { variables: { id } });
    const [updateUser] = useMutation(UPDATE_USER, { variables: { id } });

    if(loading) return <p>loading</p>
    if(error) return <p>{ error.message }</p>
    const { user } = data;

    const showDefault = () => {
        setMode({
            editMode: true,
            passwordMode: false,
            permissionMode: false,
        })
    }

    return (
        <SingleItemDiv>
            <Container className="col-md-6">
                <div className="title_header">
                    <h2>
                        <Link href="/admin/users">Users Manager</Link>
                        <FontAwesomeIcon icon="caret-right" />
                        {user.username}
                    </h2>
                    <p>Editing user - {user.username}</p>
                </div>
                <div className="text-center">
                    <img className="rounded-circle" src={user.photo || '/static/person.png'} alt={user.username} width="150" height="150" />
                    <h3>{`${user.firstname} ${user.lastname}`}</h3>
                    <p className="info"><span>Active since</span> <b>{ format( new Date(user.createdAt), "MMM d, yyyy")}</b></p>
                    <p className="info"><span>Last Logged In:</span> <b>{ user.lastLogin ? `${formatDistanceToNow( new Date(user.lastLogin) )} ago` : 'Never'}</b></p>
                    <p className="info"><span>Last Modified:</span> <b>{ formatDistanceToNow( new Date(user.updatedAt) )} ago</b></p>
                    <Container className="col-md-8">
                        <Row className="justify-content-around">
                            <SafeButton onClick={updateUser} active={!user.active} disabled={loading}>
                                { user.active ? "SUSPEND" : "ENABLE" }
                            </SafeButton>
                            <SafeButton onClick={e => setMode({editMode: false, passwordMode: false, permissionMode: true})}>
                                Set Permissions
                            </SafeButton>
                            <SafeButton onClick={e => setMode({editMode: false, permissionMode: false, passwordMode: true})}>
                                Reset Password
                            </SafeButton>
                        </Row>
                    </Container>
                </div>
                { mode.editMode && <EditUser user={user} /> }
                { mode.passwordMode && <ChangePassword resetMode={showDefault} id={user._id} /> }
                { mode.permissionMode && <Permission resetMode={showDefault} user={user} /> }                
            </Container>
        </SingleItemDiv>
    );
};

export default ASingleUser;
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row } from 'reactstrap';
import { CURRENT_USER_QUERY } from "./CurrentUser";
import PasswordReset from "./PasswordReset";
import EditUser from "./EditUser";
import SingleItemDiv from "../../styles/SingleItemDiv";
import SafeButton from "../../styles/SafeButton";

const UserAccount = () => {
    const [ mode, setMode ] = useState({
        editMode: true,
        passwordMode: false,
    });

    const { loading, data } = useQuery(CURRENT_USER_QUERY);
    if(loading) return <p>loading...</p>
    if(!data.me) return null;
    const { me } = data;

    const showDefault = () => {
        setMode({
            editMode: true,
            passwordMode: false,
        })
    }
    
    return (
        <SingleItemDiv>
            <Container className="col-md-6">
                <div className="title_header">
                    <h2>
                        My Account
                        <FontAwesomeIcon icon="caret-right" />
                        {`${me.firstname} ${me.lastname}`}
                    </h2>
                    <p>Change your name, username or login password.</p>
                </div>
                <div className="text-center">
                    <img className="rounded-circle" src={me.photo || '/static/person.png'} alt={me.username} width="150" height="150" />
                    <h3>{`${me.firstname} ${me.lastname}`}</h3>
                    <p className="info">{me.email}</p>
                    <Container className="col-md-8">
                        <Row className="justify-content-around">
                            { mode.editMode && (
                                <SafeButton onClick={e => setMode({editMode: false, passwordMode: true})}>
                                    Change Password
                                </SafeButton>
                            )}
                            { mode.passwordMode && (
                                <SafeButton onClick={e => setMode({editMode: true, passwordMode: false})}>
                                    Account Profile
                                </SafeButton>
                            )}
                        </Row>
                    </Container>
                </div>
                { mode.editMode && <EditUser user={me} /> }
                { mode.passwordMode && <PasswordReset resetMode={showDefault} id={me._id} /> }
            </Container>
        </SingleItemDiv>
    );
};

export default UserAccount;
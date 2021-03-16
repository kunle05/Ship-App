import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './CheckLogIn';

const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION {
        signOut {
            message
        }
    }
`;

const SignOut = () => {
    const [signout] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [{
            query: CURRENT_USER_QUERY
        }]
    });
    return (
        <a className="dropdown-item safelink" onClick= {() => {
            signout()
        }}>
            Sign Out
        </a>
    );
};

export default SignOut;
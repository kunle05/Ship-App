import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { FormGroup, Label, Input } from 'reactstrap';
import { USERS_QUERY } from "./ManageUsers";
import { EDIT_USER } from './EditUser';
import Form from '../../styles/Form';
import SafeButton from '../../styles/SafeButton';

const Permissions = ["USER", "MANAGER", "ADMIN"];

const Permission = ({resetMode, user}) => {
    const [permissions, setPermissions] = useState(user.permissions);
    const [updatePermissions, { loading }] = useMutation(EDIT_USER, {
        variables: {
            id: user._id,
            permissions
        },
        refetchQueries: [{query: USERS_QUERY}] 
    })

    const toggle = () => {
        resetMode();
    }

    const handleChange = e => {
        const checkbox = e.target;
        let updatedPermissions = [...permissions];
        if(checkbox.checked) {
            updatedPermissions.push(checkbox.value);
        } else {
            updatedPermissions = permissions.filter(permission => (
                permission !== checkbox.value
            ))
        }
        setPermissions([...updatedPermissions]);
    }

    const saveChanges = async () => {
        await updatePermissions();
        resetMode();
    }

    return (
        <Form method="POST" onSubmit={e => {
            e.preventDefault();
            saveChanges();
        }}>
            <fieldset disabled={loading} aria-busy={loading}>
                {
                    Permissions.map((permission, idx) => (
                        <FormGroup check key={idx}>
                            <Input 
                                type="checkbox" 
                                name="permission" 
                                checked={permissions.includes(permission)} 
                                value={permission}
                                onChange={handleChange} 
                            />
                            <Label check for="permission">
                                {
                                    permission === 'USER' ? "Able to create shipments" :
                                    permission === 'MANAGER' ? "Able to create/edit shipments" :
                                    permission === 'ADMIN' ? "Able to create/edit users, shipments and locations" : null
                                }
                            </Label>
                        </FormGroup>
                    ))
                }
                <div className="d-flex justify-content-end">
                    <SafeButton type="button" className="cancel" onClick={toggle}>Cancel</SafeButton>
                    <SafeButton type="submit">Submit</SafeButton>
                </div>
            </fieldset>
        </Form>
    );
};

export default Permission;
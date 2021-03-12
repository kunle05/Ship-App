import { useState } from 'react';
import { EDIT_USER } from './User';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import SafeButton from '../../styles/SafeButton';
import { useMutation } from '@apollo/client';

const Permissions = ["USER", "MANAGER", "ADMIN"];

const Permission = ({open, resetMode, user}) => {
    const [permissions, setPermissions] = useState(user.permissions);
    const [updatePermissions] = useMutation(EDIT_USER, {variables: {
        id: user._id,
        permissions
    }})

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
        <Modal isOpen={open} >
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
                {
                    Permissions.map((permission, idx) => (
                        <FormGroup row key={idx}>
                            <Input 
                                type="checkbox" 
                                name="permission" 
                                checked={permissions.includes(permission)} 
                                value={permission}
                                onChange={handleChange} 
                            />
                            <Label for="permission">
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
                    <SafeButton className="cancel" onClick={toggle}>Cancel</SafeButton>
                    <SafeButton onClick={saveChanges}>Submit</SafeButton>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default Permission;
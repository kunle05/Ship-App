import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import SafeButton from '../../styles/SafeButton';
import StyledModal from '../../styles/StyledModal';
import formatMoney from '../../../lib/formatMoney';
import Form from '../../styles/Form';

const ModalDiv = ({ open, setOpen, item, currency }) => {
    const [paid, setPaid] = useState(0);

    const toggle = () => {
        setOpen();
    }
    const handleChange = e => {
        let { value } = e.target;
        let valid = true;
        const decimal = value.split('.');

        if(decimal[1] && decimal[1].length > 2) {
            valid = false;
        }
        if(valid && value !== '') {
            value = parseFloat(value);
        }
        if(valid){
            setPaid(value);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

    }

    return (
        <Modal isOpen={open}>
            { item && <StyledModal>
                <Form onSubmit={handleSubmit}>
                    <ModalHeader>Confirm {item.shipper} payment</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Balance Total</InputGroupAddon>
                            <Input type="text" value={formatMoney(currency, item.amount)} readOnly />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Amount Paid</InputGroupAddon>
                            <Input type="number" value={paid} onChange={handleChange}  />
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <SafeButton className="cancel" type="button" onClick={toggle}>Cancel</SafeButton>
                        <SafeButton type="submit">Submit</SafeButton>
                    </ModalFooter>
                </Form>
            </StyledModal> }
        </Modal>
    );
};

export default ModalDiv;
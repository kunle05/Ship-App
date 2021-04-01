import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { CURRENT_USER_QUERY } from "../user/CheckLogIn";
import { LOCATIONS_QUERY } from '../../Locations'; 
import useForm from "../../../lib/useForm";
import Form from "../../styles/Form";
import SafeButton from "../../styles/SafeButton";
import ShipDiv from "../../styles/ShipDiv";
import CreateItem from "./CreateItem";
import calcTotal from "../../../lib/calcTotal";
import SideBar from "./SideBar";
import ModalDiv from "./Modal";

const PACKAGE_MUTATION = gql`
    mutation PACKAGE_MUTATION($shipper_name: String!, $shipper_phone: String!, $shipper_email: String, $recipient_name: String!, $recipient_phone: String!, $recipient_email: String, $destination: ID!, $origin: ID!, $bill_to: String, $amount: Int, $amount_paid: Int, $items: [PackageItem]) {
        newPackage(shipper_name: $shipper_name, shipper_phone: $shipper_phone, shipper_email: $shipper_email, recipient_name: $recipient_name, recipient_phone: $recipient_phone, recipient_email: $recipient_email, destination: $destination, origin: $origin, bill_to: $bill_to, amount: $amount, amount_paid: $amount_paid, items: $items) {
            _id
            shipper_name
            amount
            items {
                packaging
                weight
            }
        }
    }
`;

const initialItem = {
    packaging: "Box",
    length: "",
    width: "",
    height: "",
    reference: "",
    weight: "",
    content: "",
};

const CreatePackage = () => {
    const { loading, data } = useQuery(CURRENT_USER_QUERY);
    const { loading: loadingLoc, data: dest } = useQuery(LOCATIONS_QUERY, { variables: {active: true} });
    const [amount, setAmount] = useState('0.00');
    const [amount_paid, setAmountPaid] = useState(0);
    const [modal, setModal] = useState(false);
    const [items, setItems] = useState({
        show: 1,
        data: [ initialItem ]
    });
    const {formData, handleChange, resetForm} = useForm({
        account_number: "",
        shipper_name: "",
        shipper_phone: "",
        shipper_email: "",
        recipient_name: "",
        recipient_phone: "",
        recipient_email: "",
        destination: "",
        origin: data.me.location._id,
        currency: data.me.location.city.includes('NG') ? 'NGN' : 'USD',
        bill_to: "Shipper",
    });
    const [ ship, { error }] = useMutation(PACKAGE_MUTATION, { 
        variables: {
            ...formData, 
            amount_paid: parseFloat(amount_paid),
            items: [...items.data]
        },
        update(cache, { data: { newPackage }}) {
            cache.modify({
                fields: {
                    weeklyPackages(existingPackages = []) {
                        const newItem = cache.writeFragment({
                            data: newPackage,
                            fragment: gql`
                                fragment NewItem on Item {
                                    id
                                    type
                                }
                            `
                        });
                        return [newItem, ...existingPackages];
                    }
                }
            });
        },
    });

    const openCloseModal = () => {
        setModal(!modal);
    }

    const addItem = item => {
        let updatedItems = items.data;
        updatedItems[items.show-1] = item;
        setItems({
            show: items.show,
            data: updatedItems
        });        
        const newTotal = calcTotal(updatedItems, formData.currency);
        setAmount(newTotal);
    }; 
    const newItem = item => {
        let updatedItems = items.data;
        updatedItems[items.show-1] = item;
        setItems({
            show: items.show + 1,
            data: [...updatedItems, initialItem]
        });
    }
    const removeItem = () => {
        let updatedItems = [];
        if(items.show === 1) {
            updatedItems = [...items.data.slice(1)];
            setItems({
                show: 1,
                data: updatedItems
            });
        } else {
            updatedItems = [...items.data.slice(0, items.show -1), ...items.data.slice(items.show)];
            setItems({
                show: items.show -1,
                data: updatedItems
            });
        }
        const newTotal = calcTotal(updatedItems, formData.currency);
        setAmount(newTotal);
    };
    const removeLast = () => {
        items.data.pop();
        const updatedItems = items.data;
        setItems({
            show: items.show -1,
            data: updatedItems
        });
        const newTotal = calcTotal(updatedItems, formData.currency);
        setAmount(newTotal);
    }
    const amountPaid = val => {
        setAmountPaid(val);
    }
    const processPayment = async e => {
        e.preventDefault();
        openCloseModal();
    }
    const processShipment = async () => {
        await ship();
        resetForm();
        setAmount('0.00');
        setAmountPaid(0);
        openCloseModal();
        setItems({
            show: 1,
            data: [ initialItem ]
        });
    }

    if(loading || loadingLoc) return <p>loading...</p>
    return (
        <Row>
            <SideBar origin={formData.origin} currency={formData.currency} />
            <ShipDiv className="col-lg-9">
                <Form method="POST" onSubmit={processPayment}>
                    <fieldset >
                        <Row>
                            <Col className="p-0 section-1 sides">
                                <div className="section">
                                    <FormGroup>
                                        <Label for="account_number">Account Number</Label>
                                        <Input type="text" name="account_number"  value={formData.account_number} onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="shipper_name">Company or Name <span>*</span></Label>
                                        <Input type="text" name="shipper_name" value={formData.shipper_name} onChange={handleChange} required />
                                    </FormGroup>
                                    <Row form>
                                        <Col>
                                            <FormGroup>
                                                <Label for="shipper_phone">Phone <span>*</span></Label>
                                                <Input type="phone" name="shipper_phone" value={formData.shipper_phone} onChange={handleChange} required />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="shipper_email">Email Address</Label>
                                                <Input type="email" name="shipper_email" value={formData.shipper_email} onChange={handleChange} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="section">
                                    <FormGroup>
                                        <Label for="recipient_name">Recipient Name <span>*</span></Label>
                                        <Input type="text" name="recipient_name" value={formData.recipient_name} onChange={handleChange} required />
                                    </FormGroup>
                                    <Row form>
                                        <Col>
                                            <FormGroup>
                                                <Label for="recipient_phone">Recipient Phone <span>*</span></Label>
                                                <Input type="phone" name="recipient_phone" value={formData.recipient_phone} onChange={handleChange} required />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="recipient_email">Recipient Email</Label>
                                                <Input type="email" name="recipient_email" value={formData.recipient_email} onChange={handleChange} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Label for="destination">Destination <span>*</span></Label>
                                        <Input type="select" name="destination" value={formData.destination} onChange={handleChange} required >
                                            <option>Locations</option>
                                            {dest?.locations.map(location => (
                                                <option key={location._id} value={location._id}>{location.city}</option>
                                                ))}
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div className="section bottom">
                                    <Row form>
                                        <Col>
                                            <FormGroup>
                                                <Label for="origin">Origin</Label>
                                                <Input type="select" name="origin" value={data.me.location._id} readOnly>
                                                    <option value={data.me.location._id}>{data.me.location.city}</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="bill_to">Bill To</Label>
                                                <Input type="select" name="bill_to" value={formData.bill_to} onChange={handleChange} required >
                                                    <option value="Shipper">Shipper</option>
                                                    <option value="Receiver">Receiver</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col className="p-0 sides">
                                <CreateItem 
                                    item={items.data[items.show - 1]}
                                    currency={formData.currency} 
                                    add={addItem} 
                                    newItem={newItem}
                                    evictable={items.show !== items.data.length } 
                                    remove={removeItem} 
                                    last={items.show !== 1 && items.show === items.data.length}
                                    removeLast={removeLast} 
                                />
                                <div className="section bottom">
                                    <h4>Shipper's Cost ({formData.currency})</h4>
                                    <h2 className="text-right">{amount}</h2>
                                </div>
                                <div className="section bottom">
                                    <Row form>
                                        <Col sm={7}>
                                            Pkg
                                            { 
                                                items.show > 1 ? <a className="safelink" onClick={e => setItems({...items, show: items.show -1})}><FontAwesomeIcon icon="caret-square-left" /></a> :
                                                <FontAwesomeIcon icon="caret-square-left" color="var(--lightGray)" />
                                            }
                                            <Input type="select" className="pkgCount col-3" value={items.show} onChange={e => setItems({...items, show: e.target.value})} >
                                                {
                                                    items.data.length && items.data.map((item, idx) => (
                                                        <option key={idx} value={idx + 1}>{idx + 1}</option>
                                                        ))
                                                    }
                                            </Input>
                                            { 
                                                items.show < items.data.length ? <a className="safelink" onClick={e => setItems({...items, show: items.show +1})}><FontAwesomeIcon icon="caret-square-right" /></a> :
                                                <FontAwesomeIcon icon="caret-square-right" color="var(--lightGray)" />
                                            }
                                            of {items.data.length}
                                        </Col>
                                        <Col>
                                            <SafeButton type="submit">Process Shipment</SafeButton>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>  
                    </fieldset>
                </Form>
                <ModalDiv 
                    open={modal} 
                    setOpen={openCloseModal} 
                    item={{amount, shipper: formData.shipper_name}} 
                    process={processShipment} 
                    paid={amountPaid} 
                />
            </ShipDiv>
        </Row>
    );
};

export default CreatePackage;
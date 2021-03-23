import { useQuery } from "@apollo/client";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { CURRENT_USER_QUERY } from "./user/CheckLogIn";
import { LOCATIONS_QUERY } from '../Locations'; 
import useForm from "../../lib/useForm";
import Form from "../styles/Form";
import SafeButton from "../styles/SafeButton";
import ShipDiv from "../styles/ShipDiv";
import CreateItem from "./CreateItem";
import { useState } from "react";

const CreatePackage = () => {
    const { loading, data } = useQuery(CURRENT_USER_QUERY);
    const [items, setItems] = useState({
        show: 1,
        data: []
    });
    const {formData, handleChange} = useForm({
        account_number: "",
        shipper_name: "",
        shipper_phone: "",
        shipper_email: "",
        recipient_name: "",
        recipient_phone: "",
        recipient_email: "",
        destination: "",
        origin: data.me.location._id,
        origin_city: 'Miami',
        bill_to: "Shipper",
        amount: "0.00",
    });
    const { loading: loadingLoc, data: dest } = useQuery(LOCATIONS_QUERY, { variables: {active: true} });

    const addItem = (item) => {
        setItems({
            show: items.show + 1,
            data: [...items.data, item]
        });
    }

    if(loading || loadingLoc) return <p>loading...</p>
    return (
        <ShipDiv className="col-lg-7">
            <div className="title_header">
                <h2>Create Shipment</h2>
                <p>Create a new shipment</p>
            </div>
            <Form method="POST">
                <fieldset >
                    <Row>
                        <Col className="p-0 section-1">
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
                        <Col className="p-0">
                            <CreateItem loc={formData.origin_city} add={addItem} />
                            <div className="section bottom">
                                <h4>Shipper's Cost {formData.origin_city.includes('NG') ? '(NG)' : '(USD)'}</h4>
                                <h2 className="text-right">{formData.amount}</h2>
                            </div>
                            <div className="section footer">
                                <Row form>
                                    <Col sm={7}>
                                        Package
                                        <Input type="select" className="pkgCount col-3" value={items.show} onChange={e => setItems({...items, show: e.target.value})} >
                                            <option value="1">1</option>
                                            {
                                                items.data.length && items.data.map((item, idx) => (
                                                    <option key={idx} value={idx + 2}>{idx + 2}</option>
                                                ))
                                            }
                                        </Input>
                                        of {items.data.length + 1}
                                    </Col>
                                    <Col>
                                        <SafeButton>Process Shipment</SafeButton>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>  
                </fieldset>
            </Form>
        </ShipDiv>
    );
};

export default CreatePackage;
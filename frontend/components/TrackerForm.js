import { Col, FormGroup, Input } from "reactstrap";
import HomeTrackerForm from "./styles/HomeTracker";

const TrackerForm = () => {
    return (
        <HomeTrackerForm>
            <FormGroup row>
                <Col md={9}>
                    <Input placeholder="Tracking ID" bsSize="lg" name="non" />
                </Col>
                <Col md={3}>
                    <Input type="submit" bsSize="lg" value="Track" />
                </Col>
            </FormGroup>
            <h6>Enter package Tracking Number</h6>
        </HomeTrackerForm>
    );
};

export default TrackerForm;
import { Col, FormGroup, Input } from "reactstrap";
import styled from "styled-components";

const StyledForm = styled.form`
    input {
        text-transform: uppercase;
        height: 6rem;
        font-size: 2rem;
        padding-left: 3rem;
    }
    .col-md-3 {
        padding-left: 0px;
        margin-left: -10px;
        input {
            font-weight: bold;
            padding-left: initial;
            background: var(--blue);
            color: var(--white);
            :hover {
                transform: scale(1.1);
            }
        }
    }
    h3 {
        text-transform: uppercase;
        font-size: 1.3rem;
        padding-left: 1rem;
    }
    @media (max-width: 875px) {
        input {
            height: initial;
        }
    }
    @media (max-width: 765px) {
        .col-md-3 {
            margin-left: initial;
            margin-top: 1rem;
            padding-left: 1.5rem;
        }
    }
`;

const TrackerForm = () => {
    return (
        <StyledForm>
            <FormGroup row>
                <Col md={9}>
                    <Input placeholder="Tracking ID" bsSize="lg" name="non" />
                </Col>
                <Col md={3}>
                    <Input type="submit" bsSize="lg" value="Track" />
                </Col>
            </FormGroup>
            <h3>Enter package Tracking Number</h3>
        </StyledForm>
    );
};

export default TrackerForm;
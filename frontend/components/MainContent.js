import { Col, Container, Row } from "reactstrap";
import styled from "styled-components";
import TrackerForm from "./TrackerForm";

const StyledMain = styled.div`
    background: var(--bgBlue);
    min-height:75vh;
    /* clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%); */
    /* color: var(--white); */
    align-items: center;
    display: flex;
    position: relative;
    overflow: hidden;

    :before {
        content: "";
        position: absolute;
        border-left: 2000px solid transparent;
        border-bottom: 400px solid #ffffff;
        left: 0;
        bottom: 0;
        @media (max-width: 768px) {
            border-bottom: 900px solid #ffffff;
        }
    }
    h2 {
        font-size: 4rem;
        line-height: 5rem;
        margin-bottom: 2rem;
    }
    p {
        margin-bottom: 3rem;
    }
    .row {
        align-items: center;
    }
    img {
        position: relative;
        @media (max-width: 765px) {
            height: 200px;
        }
    }
    .d-flex {
        @media (max-width: 765px) {
            justify-content: center;
            flex-wrap: wrap;
            max-width: 100%;
        }
    }
    @media (max-width: 875px) {
        padding: 3rem 0 2rem;
        h2 {
            font-size: 3rem;
        }
        p {
            font-size: 1.5rem;
        }
    }
    @media (max-width: 765px) {
        .col-md-8 {
            text-align: center;
        }
    }
`;

const StyledSubMain = styled.div`
    padding: 2rem;
    h2 {
        text-align: center;
        text-transform: uppercase;
        color: var(--blue);
        font-size: 1.8rem;
    }
    @media (max-width: 765px) {
        .container {
            padding: 0;
        }
    }
`;

const MainContent = () => {
    return (
        <>
            <StyledMain>
                <Container className="col-12">
                    <Row>
                        <Container className="d-flex justify-comtent-between">
                                <Col md="8" >
                                    <h2>Welcome to Safe-Ship!</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit debitis, non totam deserunt accusamus modi ratione quod voluptas. Numquam unde nostrum eligendi quam accusantium quia minus beatae explicabo fugiat deserunt!</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit debitis, non totam deserunt accusamus modi ratione quod voluptas. Numquam unde nostrum eligendi quam accusantium quia minus beatae explicabo fugiat deserunt!</p>
                                    <TrackerForm />
                                </Col>
                                <figure>
                                    <img src="https://bstock.com/wp-content/uploads/2020/06/1_How-It-Works-Page-Hero-Image-700.png"/>
                                </figure>
                        </Container>
                    </Row>
                </Container>
            </StyledMain>
            <StyledSubMain>
                <Container>
                    <h2>Door to door cargo service/air &amp; sea freight shipping</h2>
                </Container>
            </StyledSubMain>
        </>
    );
};

export default MainContent;
import { Col, Container, Row } from "reactstrap";
import { StyledContent, StyledMain, StyledSubMain } from "./styles/MainContent";
import TrackerForm from "./TrackerForm";

const MainContent = () => {
    return (
        <StyledContent>
            <StyledMain>
                <Container className="col-12">
                    <Row>
                        <Container className="d-flex justify-comtent-between">
                                <Col md="8" >
                                    <h1>Welcome to Safe-Ship!</h1>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit debitis, non totam deserunt accusamus modi ratione quod voluptas. Numquam unde nostrum eligendi quam accusantium quia minus beatae explicabo fugiat deserunt!</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit debitis, non totam deserunt accusamus modi ratione quod voluptas. Numquam unde nostrum eligendi quam accusantium quia minus beatae explicabo fugiat deserunt!</p>
                                    <TrackerForm />
                                </Col>
                                <figure>
                                    <img src="https://bstock.com/wp-content/uploads/2020/06/1_How-It-Works-Page-Hero-Image-700.png" alt="image placeholder" />
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
            <h3>Tips and tools to help you get ahead</h3>
        </StyledContent>
    );
};

export default MainContent;
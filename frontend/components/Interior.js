import Link from "next/link";
import { Col, Container, Row } from "reactstrap";
import InnerContent from "./styles/InnerContent";

const Interior = props => {
    return (
        <InnerContent>
            <Container>
                <Row>
                    <Col md="6" right={props.right}>
                        <img  src="/static/package.jpg" alt="image placeholder" />
                    </Col>
                    <Col md="5">
                        <h4>That's right! You can ship to Nigeria and from Nigeria to USA.</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit debitis, non totam deserunt accusamus modi ratione quod voluptas. Numquam unde nostrum eligendi quam accusantium quia minus beatae explicabo fugiat deserunt!</p>
                        <Link href="/location">
                            <a className="btn">Button One</a>
                        </Link>
                    </Col >
                </Row>
            </Container>
        </InnerContent>
    );
};

export default Interior;
import Link from "next/link";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from "./Header";
import StyledFooter from "./styles/Footer";

const Footer = () => {
    return (
        <StyledFooter>
            <Container>
                <Row>
                    <Logo>
                        <Link href="/">Ship Safe</Link>
                    </Logo>
                    <Row>
                        <div>
                            <h6>Support</h6>
                            <div>
                                <ListGroup flush>
                                    <ListGroupItem>
                                        <Link href="/">Contact Us</Link>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Link href="/">Policy</Link>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Link href="/">FAQs</Link>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </div>
                        <div>
                            <h6>Company</h6>
                            <div>
                                <ListGroup flush>
                                    <ListGroupItem>
                                        <Link href="/">About Us</Link>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Link href="/">Contact Us</Link>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Link href="/">Careers</Link>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </div>
                        <div>
                            <h6>Locations</h6>
                            <div>
                                <ListGroup flush>
                                    <ListGroupItem>
                                        <Link href="/locations">
                                            <a>
                                                <FontAwesomeIcon icon="globe-africa" />
                                                See Locations
                                            </a>
                                        </Link>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </div>
                    </Row>
                    <Col sm="12">
                        <Row>
                            <div>
                                <Link href="/">
                                    <a>
                                        <FontAwesomeIcon icon="envelope" /> 
                                    </a>
                                </Link>
                                <Link href="/">
                                    <a>
                                        <FontAwesomeIcon icon={['fab', 'facebook']} /> 
                                    </a>
                                </Link>
                                <Link href="/">
                                    <a>
                                        <FontAwesomeIcon icon={['fab', 'twitter']} /> 
                                    </a>
                                </Link>
                                <Link href="/">
                                    <a>
                                        <FontAwesomeIcon icon={['fab', 'instagram']} /> 
                                    </a>
                                </Link>
                            </div>
                            <p><a href="https://kunleyusuf.com" target="_blank">&copy;</a> {new Date().getFullYear()} K-Kodes Solutions</p>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </StyledFooter>
    );
};

export default Footer;
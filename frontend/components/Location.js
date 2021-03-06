import { useQuery, gql } from '@apollo/client';
import Head from 'next/head';
import { Card, CardImg, CardBody, Row, CardTitle, CardSubtitle, CardText, Button, Container, Col } from 'reactstrap';
import StyledLocation from "./styles/StyledLocation";
import SafeButton from "./styles/SafeButton";

const LOCATION_QUERY = gql`
    query LOCATION_QUERY {
        locations {
            _id
            photo
            city
            address
            description
            phone
            email
        }
    }
`;

const Location = () => {
    const { loading, error, data } = useQuery(LOCATION_QUERY);
    if(loading) return <p>loading</p>
    if(error) return <p>{ error.message }</p>

    return (
        <StyledLocation>
        <Container>
            <Head>
                <title>Ship Safe Locations</title>
            </Head>
            <Row>
            { data.locations.map(location => (
                <Col md="4" key={location._id}>
                    <Card>
                        <div className="cardImage">
                            <CardImg id="abc" top height="200" src={location.photo || "/static/photodefault.jpg"} alt={location.city} />
                        </div>
                        <CardBody>
                            <CardTitle tag="h4">{location.city}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{location.address}</CardSubtitle>
                            <CardText tag="div">
                                <p>{location.description}</p>
                                <p>
                                    { location.email && <>
                                        <span>Email:</span> 
                                        <a href={`mailto:${location.email}`}> {location.email} </a><br/>
                                    </> }
                                    { location.phone && <>
                                        <span>Phone:</span>
                                        <a href={`tel:${location.phone}`}> {location.phone} </a>
                                    </> } 
                                </p>
                            </CardText>
                        </CardBody>
                        <SafeButton>Disable</SafeButton>
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
        </StyledLocation>
    );
};

export default Location;
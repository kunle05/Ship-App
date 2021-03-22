import { useQuery, gql } from '@apollo/client';
import Head from 'next/head';
import { Card, CardImg, CardBody, Row, CardTitle, CardSubtitle, CardText, Container, Col } from 'reactstrap';
import StyledLocation from "./styles/StyledLocation";

export const LOCATIONS_QUERY = gql`
    query LOCATIONS_QUERY($active: Boolean, $skip: Int, $limit: Int) {
        locations(active: $active, skip: $skip, limit: $limit) {
            _id
            photo
            city
            address
            description
            phone
            email
            active
            createdAt
            updatedAt
        }
    }
`;

const Location = () => {
    const { loading, error, data } = useQuery(LOCATIONS_QUERY, { variables: { active: true } });
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
                <Col md="6" lg="4" key={location._id}>
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
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
        </StyledLocation>
    );
};

export default Location;
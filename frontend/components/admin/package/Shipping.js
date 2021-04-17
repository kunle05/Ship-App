import { gql, useQuery } from "@apollo/client";
import { Container, Row } from "reactstrap";
import StyledTableDiv from "../../styles/StyledTableDiv";
import Package from "./Package";

//get all pkgs where item tracking is shipped
const OUTBOUND_PACKAGES_QUERY = gql`
    query OUTBOUND_PACKAGES_QUERY($origin: ID, ) {
        outBoundPackages(origin: $origin) {
            _id
            shipper_name
            tracking
            createdAt
            destination {
                city
            }
            items {
                _id
                packaging
                weight
                length
                width
                height
            }
        }
    }
`;

const Shipping = () => {
    const { loading, error, data } = useQuery(OUTBOUND_PACKAGES_QUERY, {
        variables: {origin: '6047fd15d1b87f37d1279210'}
    })

    if(loading) return <p>loading...</p>
    if(error) return <p>error...</p>

    return (
        <Container>
            <StyledTableDiv>
                <Row className="justify-content-between">
                    <div>
                        <h2>Outbound Packages</h2>
                        <p>View, print and process all outbound packages</p>
                    </div>
                </Row>
                { data.outBoundPackages.map(pkg => (
                    <Package key={pkg._id} pkg={pkg} />
                )) }
            </StyledTableDiv>
        </Container>
    );
};

export default Shipping;
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Collapse } from "reactstrap"
import StyledSideNav from "../../styles/SideBar";
import SideBarItem from "./SideBarItem";

const initials = {
    today: true,
    yesterday: false,
    week: false,
};

const WEEKLY_PACKAGE_QUERY = gql`
    query WEEKLY_PACKAGE_QUERY($origin: ID) {
        weeklyPackages(origin: $origin) {
            _id
            shipper_name
            tracking
            createdAt
            items {
                packaging
                weight
            }
        }
    }
`;
const midnight = new Date().setHours(0,0,0,0);
const twoNightsAgo = new Date().setHours(-24,0,0,0);

const SideBar = ({ origin, currency }) => {
    const [isOpen, setIsOpen] = useState(initials);
    const { loading, error, data } = useQuery(WEEKLY_PACKAGE_QUERY, { variables: {origin} })

    if(loading) return <p>loading...</p>
    if(error) return <p>error...</p>

    const toggle = e => {
        const { id } = e.target;
        initials.today = false;
        setIsOpen({
            initials,
            [id] : !isOpen[id]
        });
    }

    return (
        <StyledSideNav className="col-lg-3">
            <p>Recently Shipped Items</p>
            <div onClick={toggle} id='today' className="bar-item safelink">
                <FontAwesomeIcon icon={isOpen.today ? 'caret-down' : 'caret-right'} id="today" />
                Today
            </div>
            <Collapse isOpen={isOpen.today}>
                {
                    data.weeklyPackages
                        .filter(pkg => new Date(pkg.createdAt) > midnight)
                        .map(pkg => <SideBarItem key={pkg._id} data={pkg} currency={currency} />)
                }
            </Collapse>

            <div onClick={toggle} id="yesterday" className="bar-item safelink">
                <FontAwesomeIcon icon={isOpen.yesterday ? 'caret-down' : 'caret-right'} id="yesterday" />
                Yesterday
            </div>
            <Collapse isOpen={isOpen.yesterday}>
                {
                    data.weeklyPackages
                        .filter(pkg => new Date(pkg.createdAt) > twoNightsAgo && new Date(pkg.createdAt) < midnight)
                        .map(pkg => <SideBarItem key={pkg._id} data={pkg} currency={currency} />)
                }
            </Collapse>

            <div onClick={toggle} id="week" className="bar-item safelink">
                <FontAwesomeIcon icon={isOpen.week ? 'caret-down' : 'caret-right'} id="week" />
                This Week
            </div>
            <Collapse isOpen={isOpen.week}>
                {
                    data?.weeklyPackages
                        .filter(pkg => new Date(pkg.createdAt) < twoNightsAgo)
                        .map(pkg => <SideBarItem key={pkg._id} data={pkg} currency={currency} />)
                }
            </Collapse>
        </StyledSideNav>
    );
};

export default SideBar;
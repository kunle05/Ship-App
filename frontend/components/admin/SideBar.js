import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Collapse } from "reactstrap"
import StyledSideNav from "../styles/SideBar";
import SideBarItem from "./SideBarItem";

const initials = {
    today: false,
    yesterday: false,
    week: false,
};

const NewSideBar = () => {
    const [isOpen, setIsOpen] = useState(initials);
    const toggle = e => {
        const { id } = e.target;
        setIsOpen({
            initials,
            [id] : !isOpen[id]
        });
    }

    return (
        <StyledSideNav className="col-lg-3">
            <p>Recently Shipped Items</p>
            <div onClick={toggle} id='today' className="bar-item safelink">
                <FontAwesomeIcon icon={isOpen.today ? 'caret-down' : 'caret-right'} />
                Today
            </div>
            <Collapse isOpen={isOpen.today}>
                <SideBarItem />
            </Collapse>

            <div onClick={toggle} id="yesterday" className="bar-item safelink">
                <FontAwesomeIcon icon={isOpen.yesterday ? 'caret-down' : 'caret-right'} />
                Yesterday
            </div>
            <Collapse isOpen={isOpen.yesterday}>
                <ul>
                    <li>Test one</li>
                    <li>Test one</li>
                </ul>
            </Collapse>
        </StyledSideNav>
    );
};

export default NewSideBar;
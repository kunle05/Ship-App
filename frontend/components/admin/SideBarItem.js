import { useState } from "react";
import { Collapse } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledInnerBar from "../styles/StyledInnerBar";

const SideBarItem = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <StyledInnerBar>
            <div onClick={toggle} className="inner-bar-item safelink">
                <FontAwesomeIcon icon={isOpen ? 'caret-down' : 'caret-right'} />
                Today Inside
            </div>
            <Collapse isOpen={isOpen}>
                <ul>
                    <li>Test one</li>
                    <li>Test one</li>
                </ul>
            </Collapse>
        </StyledInnerBar>
    );
};

export default SideBarItem;
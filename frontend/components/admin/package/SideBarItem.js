import { useState } from "react";
import { Collapse } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledInnerBar from "../../styles/StyledInnerBar";

const SideBarItem = ({ data, currency }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <StyledInnerBar>
            <div onClick={toggle} className="inner-bar-item safelink">
                <FontAwesomeIcon icon={isOpen ? 'caret-down' : 'caret-right'} />
                {data.shipper_name}
            </div>
            <Collapse isOpen={isOpen}>
                <p>{data.tracking}</p>
                <ul>
                    { data.items.map(item => 
                        <li key={item._id}>
                            {item.packaging} - {item.weight}{currency === 'NGN' ? 'kg' : 'lbs'}
                        </li> 
                    )}
                </ul>
            </Collapse>
        </StyledInnerBar>
    );
};

export default SideBarItem;
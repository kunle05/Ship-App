import { useState } from 'react';
import { Table, Collapse } from 'reactstrap';

const Package = ({ pkg }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState([]);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    const handleCheck = e => {
        const checkbox = e.target;
        let updatedItems = [...items];
        checkbox.checked ?
            updatedItems.push(checkbox.value) :
            updatedItems = updatedItems.filter(item => item !== checkbox.value)
        setItems(updatedItems);
    }
    const checkAll = e => {
        const checkbox = e.target;
        let updatedItems = [...items];
        if(checkbox.checked) {
            pkg.items.map(item => {
                !updatedItems.includes(item._id) ?
                    updatedItems.push(item._id) :
                    null
            })
            setItems(updatedItems);
        } else {
            setItems([]);
        }
    }

    return (
        <div className="pkg-tab">
            <div className={`d-flex ${!isOpen? 'closed' : ''}`}>
                <input 
                    type="checkbox" 
                    value={pkg._id} 
                    checked={items.length === pkg.items.length} 
                    onChange={checkAll} 
                />
                <div onClick={toggle} style={{width: '94%'}} >
                    {pkg.destination.city.substr(-2)} - {pkg.tracking}
                </div>
                <span> {pkg.items.length} </span>
            </div>
            <Collapse isOpen={isOpen}>
                <div className="table-responsive">
                    <Table>
                        <tbody>
                            { pkg.items.map(item => (
                                <tr key={item._id}>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            value={item._id} 
                                            checked={items.includes(item._id)}
                                            onChange={handleCheck} 
                                        />
                                    </td>
                                    <td>{item.packaging}</td>
                                    <td>{item.weight}</td>
                                    { (item.length && item.width) ?
                                        <td>{item.length} x {item.width} x {item.height}</td> :
                                        <td></td>
                                    }
                                    <td>{item.reference}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Collapse>
        </div>
    );
};

export default Package;
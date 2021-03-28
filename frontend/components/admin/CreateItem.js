import { useState } from "react";
import { Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from "reactstrap";
import useForm from "../../lib/useForm";

const contents = ['Automobile', 'Clothing', 'Computer', 'Electronic', 'Food Product', 'Furniture', 'General good', 'Mobile Device', 'Other'];

const CreateItem = ({ item, loc, add, newItem, evictable, remove, last, removeLast, weight }) => {
    const {formData, handleChange, resetForm} = useForm(item);
    const [isValidError, setIsValidError] = useState({
        packaging: false,
        content: false,
        weight: false
    });
    const validateWeight = () => {
        const {packaging, content} = formData;
        !packaging ? setIsValidError({...isValidError, packaging: true}) :
        !content ? setIsValidError({...isValidError, content: true}) : null

        if(!packaging || !content) {
            return false;
        } else {
            return true;
        }
    }
    const validate = () => {
        const {packaging, content, weight} = formData;
        !packaging ? setIsValidError({...isValidError, packaging: true}) :
        !content ? setIsValidError({...isValidError, content: true}) :
        !weight ? setIsValidError({...isValidError, weight: true}) :
        null

        if(!packaging || !content || !weight || !isNum(formData.weight)) {
            return false;
        } else {
            return true;
        }
    }
    const isNum = (val) => {
        return /^\d+$/.test(val)
    }
    const addItem = () => {
        if(validate()) {
            resetForm();
            newItem(formData);
        };
    }
    const handleWeightChange = e => {
        isValidError.weight ? 
            setIsValidError({...isValidError, weight: false}) 
            : null;
        const weightValid = validateWeight();
        const isnum = isNum(e.target.value);

        if(weightValid && isnum) {
            handleChange(e);
            const data = formData;
            data.weight = e.target.value;
            add(data);
        } 
        else if(!isnum) {
            setIsValidError({...isValidError, weight: true});
            handleChange(e);
        }
    }

    return (
        <div className="section pb-0">
            <FormGroup>
                <Label for="packaging">Package Type <span>*</span></Label>
                <Input type="select" name="packaging" value={formData.packaging} onChange={handleChange} required invalid={isValidError.packaging} >
                    <option value="Box">Box</option>
                    <option value="Crate">Crate</option>
                    <option value="Pallet">Pallet</option>
                    <option value="Other">Other</option>
                </Input>
            </FormGroup>
            <Row form>
                <Col>
                    <FormGroup>
                        <Label for="length">Length</Label>
                        <Input type="text" name="length" value={formData.length} onChange={handleChange} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="width">Width</Label>
                        <Input type="text" name="width" value={formData.width} onChange={handleChange} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="height">Height</Label>
                        <Input type="text" name="height" value={formData.height} onChange={handleChange} />
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label for="reference">Reference Number</Label>
                <Input type="text" name="reference" value={formData.reference} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                <Label for="content">Content Category <span>*</span></Label>
                <Input type="select" name="content" value={formData.content} 
                onChange={e => {isValidError.content ? setIsValidError({...isValidError, content: false}) : null; handleChange(e)} } 
                required invalid={isValidError.content} >
                    <option>Choose one...</option>
                    {contents.map((content, idx) => (
                        <option key={idx} value={content}> {content} </option>
                    ))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="weight">Weight <span>*</span></Label>
                <InputGroup>
                    <Input className="col-sm-6" type="text" name="weight" value={formData.weight} 
                    onChange={handleWeightChange}
                    required invalid={isValidError.weight} />
                    <InputGroupAddon addonType="append">
                        <InputGroupText><b>{loc.includes('NG') ? 'KG' : 'LBS'}</b></InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
            { last ? 
                <Row className="cta">
                    <a className="safelink" onClick={e => removeLast()}>Remove this Package</a>
                    <a className="safelink" onClick={addItem}>Add Package</a>
                </Row> :
                evictable ? 
                    <Row className="justify-content-end">
                        <a className="text-right safelink" onClick={e => remove()}>Remove this Package</a> 
                    </Row> :
                    <Row className="justify-content-end">
                        <a className="text-right safelink" onClick={addItem}>Add Package</a>
                    </Row>
            }
        </div>
    );
};

export default CreateItem;
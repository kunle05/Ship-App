import { useState } from "react";
import { Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from "reactstrap";
import useForm from "../../lib/useForm";

const contents = ['Automobile', 'Clothing', 'Computer', 'Electronic', 'Food Product', 'Furniture', 'General good', 'Mobile Device', 'Other'];

const CreateItem = ({ item, loc, add, evictable, remove, last, removeLast }) => {
    const {formData, handleChange, resetForm} = useForm(item);
    const [isValid, setIsValid] = useState({
        packaging: false,
        content: false,
        weight: false
    });

    const validate = () => {
        const {packaging, content, weight} = formData;
        !packaging ? setIsValid({...isValid, packaging: true}) :
        !content ? setIsValid({...isValid, content: true}) :
        !weight ? setIsValid({...isValid, weight: true}) :
        null

        if(!packaging || !content || !weight) {
            return false;
        } else {
            return true;
        }
    }
    const addItem = () => {
        if(validate()) {
            add(formData);
            resetForm();
        };
    }

    return (
        <div className="section pb-0">
            <FormGroup>
                <Label for="packaging">Package Type <span>*</span></Label>
                <Input type="select" name="packaging" value={formData.packaging} onChange={handleChange} required invalid={isValid.packaging} >
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
                onChange={e => {isValid.content ? setIsValid({...isValid, content: false}) : null; handleChange(e)} } 
                required invalid={isValid.content} >
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
                    onChange={e => {isValid.weight ? setIsValid({...isValid, weight: false}) : null; handleChange(e)} }  
                    required invalid={isValid.weight} />
                    <InputGroupAddon addonType="append">
                        <InputGroupText><b>{loc.includes('NG') ? 'KG' : 'LBS'}</b></InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
            { last ? 
                <Row className="cta">
                    <h4 className="safelink" onClick={e => removeLast()}>
                        <a>Remove this Package</a>
                    </h4> 
                    <h4 className="safelink" onClick={addItem}>
                        <a>Add Package</a>
                    </h4>
                </Row> :
                evictable ? 
                    <h4 className="text-right safelink pt-3" onClick={e => remove()}><a>Remove this Package</a></h4> :
                    <h4 className="text-right safelink pt-3" onClick={addItem}><a>Add Package</a></h4>
            }
        </div>
    );
};

export default CreateItem;
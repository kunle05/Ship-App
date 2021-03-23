import { Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from "reactstrap";
import useForm from "../../lib/useForm";

const contents = ['Automobile', 'Clothing', 'Computer', 'Electronic', 'Food Product', 'Furniture', 'General good', 'Mobile Device', 'Other'];

const CreateItem = ({ loc, add }) => {
    const {formData, handleChange} = useForm({
        packaging: "Box",
        length: "",
        width: "",
        height: "",
        reference: "",
        weight: 0,
        content: "",
    });

    return (
        <div className="section pb-0">
            <FormGroup>
                <Label for="packaging">Package Type <span>*</span></Label>
                <Input type="select" name="packaging" value={formData.packaging} onChange={handleChange} required >
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
                        <Input type="number" name="length" value={formData.length} onChange={handleChange} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="width">Width</Label>
                        <Input type="number" name="width" value={formData.width} onChange={handleChange} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="height">Height</Label>
                        <Input type="number" name="height" value={formData.height} onChange={handleChange} />
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label for="reference">Reference Number</Label>
                <Input type="text" name="reference" value={formData.reference} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                <Label for="content">Content Category <span>*</span></Label>
                <Input type="select" name="content" value={formData.content} onChange={handleChange}>
                    <option>Choose one...</option>
                    {contents.map((content, idx) => (
                        <option key={idx} value={content}> {content} </option>
                    ))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="weight">Weight <span>*</span></Label>
                <InputGroup>
                    <Input type="number" name="weight" value={formData.weight} onChange={handleChange} className="col-sm-6" />
                    <InputGroupAddon addonType="append">
                        <InputGroupText><b>{loc.includes('NG') ? 'KG' : 'LBS'}</b></InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
            <h4 className="text-right mt-4 safelink" onClick={e => add(formData)}><a>Add Package</a></h4>
        </div>
    );
};

export default CreateItem;
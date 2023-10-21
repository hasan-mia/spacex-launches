import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

export default function SearchOption() {
  return (
    <>
      <Col xs={12}>
        <Row className="mt-3 mb-5">
          <Col sm={12} md={4}>
            <InputGroup className="mt-0 mt-md-5">
              <Form.Control
                placeholder="Search..."
                aria-label="search"
                aria-describedby="search"
                className="outline-none shaddow-none"
              />
              <Button variant="outline-none bg-primary text-white" id="search">
                <BsSearch />
              </Button>
            </InputGroup>
          </Col>
          <Col sm={12} md={4}>
            <Form.Select aria-label="By Launch Status" className="mt-0 mt-md-5">
              <option>By Launch Status</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
          <Col sm={12} md={4}>
            <Form>
              <Form.Check id="default" label="Show upcoming only" />
            </Form>
            <Form.Select aria-label="By Launch Date" className="mt-4">
              <option>By Launch Date</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
        </Row>
      </Col>
    </>
  );
}

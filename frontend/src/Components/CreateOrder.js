import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import SimpleMapModal from "./SimpleMapModal";
const CreateOrder = () => {
  const [dish, setDish] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  

  return (
    <div className="w-50">
      <Form className="mx-4">
        <Row className="my-1">
          <Col>
            <Form.Group>
              <Form.Label>Enter name of the dish:</Form.Label>
              <Form.Select onChange={(e)=> setDish(e.target.value)}>
                <option>Choose a dish</option>
                <option value="Paneer Tikka Masala">Paneer Tikka Masala</option>
                <option value="Chicken Tikka Masala">Chicken Tikka Masala</option>
                <option value="Butter Chicken">Butter Chicken</option>
              </Form.Select>
            
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Enter Quantity:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button
          variant="primary"
          className="mt-1"
          onClick={() => setModalShow(true)}
        >
          Create Order
        </Button>
      </Form>
      <SimpleMapModal show={modalShow} onHide={()=> setModalShow(false)} dish={dish} quantity={quantity} />
    </div>
  );
};

export default CreateOrder;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";

const UnassignedOrder = () => {
  const [assigned, setAssigned] = useState();
  const [unassigned, setUnassigned] = useState();

  const fetchOrders = () => {
    axios
      .get("https://ziggy-1-taik.onrender.com/current")
      .then((response) => {
        setAssigned(response.data.assignedOrders);
        setUnassigned(response.data.unassignedOrders);
        console.log(assigned);
      })
      .catch((error) => {
        console.error("There was an error fetching the assigned!", error);
      });
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); // fetch every 5 seconds

    return () => clearInterval(interval);
  });

  return (
    <Row style={{ marginTop: "10px" }}>
      <Col>
        <ListGroup as="ol" style={{ width: "70%", marginLeft: "200px" }}>
          <ListGroup.Item as="li" active style={{ height: "7vh" }}>
            Assigned Orders
          </ListGroup.Item>
          {assigned &&
            assigned.map((child, key) => {
              return (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{child.dish}</div>
                    Assigned
                  </div>
                  <Badge bg="primary" pill>
                    {child.quantity}
                  </Badge>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Col>
      <Col>
        <ListGroup as="ol" style={{ width: "70%" }}>
          <ListGroup.Item as="li" active style={{ height: "7vh" }}>
            Unassigned Orders
          </ListGroup.Item>
          {unassigned &&
            unassigned.map((child, key) => {
              return (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{child.dish}</div>
                    Unassigned
                  </div>
                  <Badge bg="primary" pill>
                    {child.quantity}
                  </Badge>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default UnassignedOrder;

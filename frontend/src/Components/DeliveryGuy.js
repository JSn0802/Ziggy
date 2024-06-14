import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const DeliveryGuy = () => {
  const [deliveryGuys, setDeliveryGuys] = useState(null);

  const fetchOrders = () => {
    axios
      .get("https://ziggy-1-taik.onrender.com/deliveryguys")
      .then((response) => {
        console.log(response.data.delivery);
        setDeliveryGuys(response.data.delivery);
      })
      .catch((error) => {
        console.error("There was an error fetching the orders!", error);
      });
  };

  const delivered = (key) => {
    console.log(key);
    axios
      .post("https://ziggy-1-taik.onrender.com/delivered", { id: key })
      .then((response) => {
        console.log("Order delivered");
        alert(response.data.message);
      });
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); // fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {deliveryGuys &&
        deliveryGuys.map((child, key) => {
          return (
            <Card
              id={key}
              style={{
                width: `${100 / deliveryGuys.length - 5}%`,
                display: "inline-block",
                marginTop: "1rem",
                marginRight: "1rem",
                marginLeft: "2rem",
              }}
            >
              <Card.Img variant="top" src="/DeliveryGuy.png" />
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col>Name:</Col>
                    <Col></Col>
                    <Col>{child.name}</Col>
                  </Row>
                  <Row>
                    <Col>Distance:</Col>
                    <Col></Col>
                    <Col>
                      {child.distance
                        ? Math.ceil(child.distance * 1000) + " Mtrs"
                        : "-"}
                    </Col>
                  </Row>
                  <Row>
                    <Col>Status:</Col>
                    <Col></Col>
                    <Col>{child.status}</Col>
                  </Row>
                  <Row>
                    <Col>Order:</Col>
                    <Col></Col>
                    <Col xs={6}>{child.order ? child.order : "-"}</Col>
                  </Row>
                </Card.Text>
                <Button type="primary" onClick={() => delivered(child.id)}>
                  {child.status === "busy" ? "Deliver" : "Delivered"}
                </Button>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};

export default DeliveryGuy;

import axios from "axios";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function SimpleMapModal(props) {
  const dish = props.dish;
  const quantity = props.quantity;
  const AnyReactComponent = ({ text }) => (
    <div style={{}}>
      <img
        src="/Pin.png"
        alt=""
        style={{ height: "100px", width: "30px", objectFit: "contain" }}
      />
      {text}
    </div>
  );

  const [marker, setMarker] = useState(null);

  const Submit = () => {
    console.log(dish, quantity, marker);
    axios
      .post("https://ziggy-1-taik.onrender.com/order", {
        dish: dish,
        marker: marker,
        quantity: quantity,
      })
      .then(function (response) {
        if (response.status === 200) {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        alert(error)
        console.error("Error:", error);
      });
    setMarker(null);
    props.onHide();
  };

  const handleApiLoaded = (map, maps, e) => {
    setMarker({
      lat: e.lat,
      lng: e.lng,
      name: "Place",
    });
  };

  useEffect(() => {
    if (marker) {
      console.log("Marker updated:", marker);
    }
  }, [marker]);

  const defaultProps = {
    center: {
      lat: 23.107121229477112,
      lng: 72.60059727420476,
    },
    zoom: 15,
  };

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Select Location</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "30rem", width: "100%" }}>
        <GoogleMapReact
          key={new Date().getTime()}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onClick={({ lat, lng }) => handleApiLoaded(null, null, { lat, lng })}
        >
          <AnyReactComponent
            lat={defaultProps.lat}
            lng={defaultProps.lng}
            text={defaultProps.name}
          />
          {marker && (
            <AnyReactComponent
              lat={marker.lat}
              lng={marker.lng}
              text={marker.name}
            />
          )}
        </GoogleMapReact>
      </Modal.Body>
      <div className="text-center">
        <Button className="mb-1 w-50" onClick={Submit}>
          Place your order
        </Button>
      </div>
    </Modal>
  );
}

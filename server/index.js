const express = require("express");
var cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

const assigned = [];
const unassigned = [];

function haversine(lat1, lon1, lat2, lon2) {
  // distance between latitudes
  // and longitudes
  let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  let dLon = ((lon2 - lon1) * Math.PI) / 180.0;

  // convert to radians
  lat1 = (lat1 * Math.PI) / 180.0;
  lat2 = (lat2 * Math.PI) / 180.0;

  // apply formulae
  let a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  let rad = 6371;
  let c = 2 * Math.asin(Math.sqrt(a));
  return rad * c;
}

const deliveryGuys = [
  {
    id: 1,
    name: "John",
    status: "free",
    order: "",
    lat: 23.107245340503884,
    lng: 72.60049368598608,
    distance: null,
  },
  {
    id: 2,
    name: "Jane",
    status: "free",
    order: "",
    lat: 23.109247627362798,
    lng: 72.59490978267345,
    distance: null,
  },
  {
    id: 3,
    name: "Bob",
    status: "free",
    order: "",
    lat: 23.102531726458796,
    lng: 72.60151729388122,
    distance: null,
  },
];

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/order", (req, res) => {
  console.log(req.body);
  const { marker, dish, quantity } = req.body;

  if (!dish || !quantity) {
    return res.status(400).json({ error: "Dish and quantity are required" });
  }

  let minDist = 1000000;
  let guyID;

  deliveryGuys.forEach((guy) => {
    let dist = haversine(marker.lat, marker.lng, guy.lat, guy.lng);
    if (guy.status === "free" && dist < minDist) {
      minDist = dist;
      guyID = guy.id;
    }
  });

  const freeGuy = deliveryGuys.find((ele) => ele.id === guyID);

  if (!freeGuy) {
    res.status(200).json({ message: "No Delivery guy available, stay tuned!" });
    unassigned.push(req.body);
    return;
  }

  console.log(minDist);
  freeGuy.distance = minDist;
  freeGuy.status = "busy";
  freeGuy.order = quantity + " " + dish;
  assigned.push(req.body);

  res
    .status(200)
    .json({ message: "Order received", order: { dish, quantity } });
});

app.get("/deliveryguys", (req, res) => {
  res.status(200).json({ delivery: deliveryGuys });
});

app.get("/current", (req, res) => {
  res
    .status(200)
    .json({ assignedOrders: assigned, unassignedOrders: unassigned });
});

app.post("/delivered", (req, res) => {
  const { id } = req.body;
  const deliveryGuy = deliveryGuys.find((ele) => ele.id === id);

  if (!deliveryGuy) {
    res.status(404).json({ message: "Delivery guy not found" });
    return;
  }

  deliveryGuy.distance = null;
  deliveryGuy.status = "free";
  deliveryGuy.order = "";

  // Check if there are any unassigned orders
  if (unassigned.length > 0) {
    const nextOrder = unassigned.shift(); // Get the first unassigned order
    console.log(nextOrder, deliveryGuy)
    deliveryGuy.status = "busy";
    deliveryGuy.distance= haversine(nextOrder.marker.lat, nextOrder.marker.lng, deliveryGuy.lat, deliveryGuy.lng)
    deliveryGuy.order = nextOrder.quantity + " " + nextOrder.dish;
    assigned.push(nextOrder);

    res
      .status(200)
      .json({ message: "Order Delivered and new order assigned", nextOrder });
  } else {
    res.status(200).json({ message: "Order Delivered" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

import axios from "axios";
import React, { useEffect, useState } from "react";

const UnassignedOrder = () => {
  const [assigned, setAssigned] = useState();
  const [unassigned, setUnassigned] = useState();

  const fetchOrders = () => {
    axios
      .get("https://ziggy-1-taik.onrender.com/current")
      .then((response) => {
        setAssigned(response.data.assignedOrders);
        setUnassigned(response.data.unassignedOrders)
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
  }, []);

  return (
    <div className="mt-2 mx-1">
      {assigned &&
        assigned.map((child, key) => {
          return (
            <div>
              {unassigned && unassigned.map((child,index)=>{
                return(
                  <div>{child.quantity} {child.dish} are unassgined</div>
                );
              })}
              {/* {assigned && assigned.map((child,index)=>{
                return(
                  <div>{child.quantity} {child.dish} are assgined</div>
                );
              })} */}
            </div>
          );
        })}
    </div>
  );
};

export default UnassignedOrder;

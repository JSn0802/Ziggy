import CreateOrder from "./Components/CreateOrder";
import DeliveryGuy from "./Components/DeliveryGuy";
import UnassignedOrder from "./Components/UnassignedOrder";

function App() {
  
  return (
    <div style={{overflowX:"hidden"}}>
      <CreateOrder />
      <DeliveryGuy />
      <UnassignedOrder/>
      
      {/* <CurrentOrder/> */}
    </div>
  );
}

export default App;

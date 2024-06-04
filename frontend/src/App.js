import CreateOrder from "./Components/CreateOrder";
import DeliveryGuy from "./Components/DeliveryGuy";
import UnassignedOrder from "./Components/UnassignedOrder";

function App() {
  
  return (
    <div className="App">
      <CreateOrder />
      <DeliveryGuy />
      <UnassignedOrder/>
      
      {/* <CurrentOrder/> */}
    </div>
  );
}

export default App;

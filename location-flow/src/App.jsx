import { useState } from "react";
import Map from "./components/Map";
import AddressForm from "./components/AddressForm";

function App() {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [savedAddressDetails, setSavedAddressDetails] = useState(null);

  const handleSelectedAddress = (address) => {
    console.log("Selected Address: ", address);
    setSelectedAddress(address);
  };

  const handleSaveAddress = (details) => {
    console.log("Saved Address Details: ", details);
    setSavedAddressDetails({ ...details, address: selectedAddress });
  };

  return (
    <>
      <h4>Location Selector</h4>
      <Map onAddressSelect={handleSelectedAddress} />
      <AddressForm onSave={handleSaveAddress} />
      {selectedAddress && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Address:</h3>
          <p>{selectedAddress}</p>
        </div>
      )}
      {savedAddressDetails && (
        <div style={{ marginTop: "20px" }}>
          <h3>Saved Address:</h3>
          <p>Address: {savedAddressDetails.address}</p>
          <p>House/Flat No.: {savedAddressDetails.houseNumber}</p>
          <p>Apartment/Area: {savedAddressDetails.area}</p>
          <p>Category: {savedAddressDetails.category}</p>
        </div>
      )}
    </>
  );
}

export default App;

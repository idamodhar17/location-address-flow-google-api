import { useState } from "react";
import Map from "./components/Map";
import AddressForm from "./components/AddressForm";
import LocationPopup from "./components/LocationPopUp";

function App() {
  const [addressDetails, setAddressDetails] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleSaveAddress = (details) => {
    console.log("Address Details: ", details);
    setAddressDetails(details);
  };

  const handleEnableLocation = () => {
    setIsPopupOpen(false);
    console.log("Enable Location clicked");
  };

  const handleManualEntry = () => {
    setIsPopupOpen(false);
    console.log("Search Location Manually clicked");
  };

  return (
    <>
      <h4>Location Selector</h4>
      {isPopupOpen && (
        <LocationPopup
          onEnableLocation={handleEnableLocation}
          onManualEntry={handleManualEntry}
        />
      )}
      <Map />
      <AddressForm onSave={handleSaveAddress} />
      {addressDetails && (
        <div style={{ marginTop: "20px" }}>
          <h3>Saved Address:</h3>
          <p>House No.: {addressDetails.houseNumber}</p>
          <p>Area: {addressDetails.area}</p>
          <p>Category: {addressDetails.category}</p>
        </div>
      )}
    </>
  );
}

export default App;

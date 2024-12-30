import { useState } from 'react'
import Map from "./components/Map"
import AddressForm from './components/AddressForm'


function App() {
  const [addressDetails, setAddressDetails] = useState(null);

  const handleSaveAddress = (details) => {
    console.log("Address Details: ", details);
    setAddressDetails(details);
  };

  return (
    <>
      <h4>Location Selector</h4>
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
  )
}

export default App
import { useState, useEffect } from "react";
import Map from "./components/Map/Map";
import AddressForm from "./components/AddressForm/AddressForm";
import axios from "axios";

function App() {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [savedAddressDetails, setSavedAddressDetails] = useState([]);
  const [allSavedAddresses, setAllSavedAddresses] = useState([]);

  useEffect(() => {
    fetchSavedAddresses();
  }, []);

  const fetchSavedAddresses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/saved-addresses");
      setAllSavedAddresses(response.data);
    } catch (error) {
      console.error("Error fetching saved addresses:", error);
    }
  };

  const handleSelectedAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleSaveAddress = async (details) => {
    const addressToSave = { ...details, address: selectedAddress };
    try {
      await axios.post("http://localhost:5000/api/save-address", addressToSave);
      setSavedAddressDetails(addressToSave);
      fetchSavedAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <>
      <center><h2>Location Selector</h2></center>
      <Map onAddressSelect={handleSelectedAddress} />
      <AddressForm onSave={handleSaveAddress} />
      <div style={{ marginTop: "20px" }}>
        <h3>Saved Locations</h3>
        {allSavedAddresses.map((addr, index) => (
          <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}>
            <h4>
              {addr.category === "Home" ? "🏠 Home" : addr.category === "Office" ? "🏢 Office" : "👨‍👩‍👧 Friends & Family"}
            </h4>
            <p>{addr.address}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
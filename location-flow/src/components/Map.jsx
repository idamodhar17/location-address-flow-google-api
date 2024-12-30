import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const defaultCenter = {
  lat: 19.076,
  lng: 72.8777,
};

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [address, setAddress] = useState("");

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          console.log("Current Location:", latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA09XcJ_mmZPXlUBIWdEVOBlGahnQQ7V60`
      );
      const formattedAddress =
        response.data.results.length > 0
          ? response.data.results[0].formatted_address
          : "Address not found";
      setAddress(formattedAddress);
    } catch (error) {
      console.error("Error fetching address: ", error);
    }
  };

  const handleMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCurrentPosition({ lat, lng });
    console.log("New Position: ", lat, lng);
  };

  return (
    <div>
      <button
        onClick={getCurrentLocation}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Locate Me
      </button>
      <LoadScript googleMapsApiKey="AIzaSyA09XcJ_mmZPXlUBIWdEVOBlGahnQQ7V60">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={15}
        >
          <Marker
            position={currentPosition}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        </GoogleMap>
      </LoadScript>
      <div style={{ marginTop: "10px" }}>
        <p>
          <strong>Selected Address:</strong> {address}
        </p>
      </div>
    </div>
  );
};

export default Map;

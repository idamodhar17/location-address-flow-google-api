import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

import LocationPopup from "./LocationPopUp";

const containerStyle = {
  width: "100%",
  height: "400px",
  maxWidth: "800px",
  margin: "0 auto",
};

const defaultCenter = {
  lat: 19.076,
  lng: 72.8777,
};

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isAddressSaved, setIsAddressSaved] = useState(false);

  useEffect(() => {
    if (currentPosition) {
      getAddressFromLatLng(currentPosition.lat, currentPosition.lng);
    }
  }, [currentPosition]);

  const handleEnableLocation = () => {
    setIsPopupOpen(false);
    getCurrentLocation();
  };

  const handleManualEntry = () => {
    setIsPopupOpen(false);
    console.log("Search Location Manually clicked");
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Current Location:", latitude, longitude);
          getAddressFromLatLng(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          if (error.code === error.PERMISSION_DENIED) {
            alert("Location access denied. Please enable location services.");
          } else {
            alert("Could not fetch location. Please try again.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const getAddressFromLatLng = async (lat, lng) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const formattedAddress =
        response.data.results.length > 0
          ? response.data.results[0].formatted_address
          : "Address not found";
      setAddress(formattedAddress);
      // onAddressSelect(formattedAddress);
    } catch (error) {
      console.error("Error fetching address: ", error);
      setAddress("Error fetching address.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  return (
    <div>
      {isPopupOpen && (
        <LocationPopup
          onEnableLocation={handleEnableLocation}
          onManualEntry={handleManualEntry}
        />
      )}
      <div style={{ overflow: "hidden", position: "relative", display: "block" }}>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={15}
            onClick={(event) => {
              const lat = event.latLng.lat();
              const lng = event.latLng.lng();
              setCurrentPosition({ lat, lng });
            }}
          >
            <Marker
              position={currentPosition}
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
            />
          </GoogleMap>
        </LoadScript>
      </div>
      <div style={{ marginTop: "10px" }}>
        <p>
          <strong>Selected Address:</strong>{" "}
          {isLoading ? "Fetching address..." : address}
        </p>
      </div>
    </div>
  );
};

export default Map;

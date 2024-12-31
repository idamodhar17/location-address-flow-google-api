import React, { useState, useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
import LocationPopup from "../LocationPopUp/LocationPopUp";

const containerStyle = {
  width: "100%",
  height: "300px",
  maxWidth: "100%",
  margin: "0 auto",
};

const defaultCenter = {
  lat: 19.076,
  lng: 72.8777,
};

const Map = ({ onAddressSelect }) => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!isApiLoaded) {
      loadGoogleMapsApi();
    }
  }, [isApiLoaded]);

  const loadGoogleMapsApi = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => setIsApiLoaded(true);
    document.head.appendChild(script);
  };

  const handleEnableLocation = () => {
    setIsPopupOpen(false);
    getCurrentLocation();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          setCurrentPosition(newPosition);
          if (markerRef.current) {
            markerRef.current.setPosition(newPosition);
          }
          getAddressFromLatLng(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not fetch location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const getAddressFromLatLng = async (lat, lng) => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/geocode", {
        params: { lat, lng },
      });
      if (response.data.address) {
        setAddress(response.data.address);
        onAddressSelect(response.data.address);
      } else {
        setAddress("Address not found.");
      }
    } catch (error) {
      console.error("Error fetching address:", error.response?.data || error.message);
      setAddress("Error fetching address.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceSelect = (place) => {
    const location = place.geometry.location;
    const lat = location.lat();
    const lng = location.lng();
    const newPosition = { lat, lng };
    setCurrentPosition(newPosition);
    if (markerRef.current) {
      markerRef.current.setPosition(newPosition);
    }
    getAddressFromLatLng(lat, lng);
  };

  const handleMarkerDragEnd = () => {
    const lat = markerRef.current.getPosition().lat();
    const lng = markerRef.current.getPosition().lng();
    const newPosition = { lat, lng };
    setCurrentPosition(newPosition);
    getAddressFromLatLng(lat, lng);
  };

  const onMapLoad = (map) => {
    mapRef.current = map;
    const marker = new google.maps.Marker({
      position: currentPosition,
      map: map,
      draggable: true,
    });
    markerRef.current = marker;
    google.maps.event.addListener(marker, "dragend", handleMarkerDragEnd);
  };

  return (
    <div>
      {isPopupOpen && (
        <LocationPopup
          onEnableLocation={handleEnableLocation}
          onManualEntry={() => setIsPopupOpen(false)}
        />
      )}
      {isApiLoaded && (
        <Autocomplete
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          onPlaceSelected={handlePlaceSelect}
          types={["geocode"]}
          placeholder="Search for an address"
          style={{
            margin: "10px",
            width: "100%",
            maxWidth: "500px",
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            alignSelf: "center",
          }}
        />
      )}
      <div style={{ overflow: "hidden", position: "relative", display: "block" }}>
        {isApiLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={15}
            onClick={(event) => {
              const lat = event.latLng.lat();
              const lng = event.latLng.lng();
              const newPosition = { lat, lng };
              setCurrentPosition(newPosition);
              if (markerRef.current) {
                markerRef.current.setPosition(newPosition);
              }
              getAddressFromLatLng(lat, lng);
            }}
            onLoad={onMapLoad}
          />
        )}
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

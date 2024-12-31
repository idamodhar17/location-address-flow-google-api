import React, { useState, useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
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
    script.onload = () => {
      setIsApiLoaded(true);
    };
    document.head.appendChild(script);
  };

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
          setCurrentPosition({ lat: latitude, lng: longitude });
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
    } catch (error) {
      console.error("Error fetching address: ", error);
      setAddress("Error fetching address.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceSelect = (place) => {
    const location = place.geometry.location;
    const lat = location.lat();
    const lng = location.lng();
    setCurrentPosition({ lat, lng });
  };

  const handleMarkerDragEnd = () => {
    const lat = markerRef.current.getPosition().lat();
    const lng = markerRef.current.getPosition().lng();
    setCurrentPosition({ lat, lng });
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
          onManualEntry={handleManualEntry}
        />
      )}
      {isApiLoaded && (
        <Autocomplete
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          onPlaceSelected={handlePlaceSelect}
          types={["geocode"]}
          placeholder="Search for an address"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
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
              setCurrentPosition({ lat, lng });
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

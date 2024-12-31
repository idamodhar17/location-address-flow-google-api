import React from "react";
import locationPin from "../assets/location-pin.png"

const LocationPopup = ({ onEnableLocation, onManualEntry }) => {
  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.modal}>
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <img
            src={locationPin}
            alt="Location Off"
            style={{ width: "50px", marginBottom: "10px" }}
          />
          <h3>Location permission is off</h3>
          <p>
            We need your location to find the nearest store & provide you a
            seamless delivery experience.
          </p>
        </div>
        <button
          style={popupStyles.enableButton}
          onClick={onEnableLocation}
        >
          Enable Location
        </button>
        <button
          style={popupStyles.manualButton}
          onClick={onManualEntry}
        >
          Search your Location Manually
        </button>
      </div>
    </div>
  );
};

const popupStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  enableButton: {
    backgroundColor: "#ff4747",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "10px",
    width: "100%",
  },
  manualButton: {
    backgroundColor: "#fff",
    color: "#ff4747",
    padding: "10px 20px",
    border: "1px solid #ff4747",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
  },
};

export default LocationPopup;

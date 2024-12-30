import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 19.076,
  lng: 72.8777,
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyA09XcJ_mmZPXlUBIWdEVOBlGahnQQ7V60">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

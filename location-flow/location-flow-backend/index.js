const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const awsServerlessExpress = require("aws-serverless-express");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
  
app.get("/api/geocode", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Latitude and longitude are required." });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const formattedAddress =
      response.data.results.length > 0
        ? response.data.results[0].formatted_address
        : "Address not found";

    res.json({ address: formattedAddress });
  } catch (error) {
    console.error("Error fetching address:", error.message);
    res.status(500).json({ error: "Failed to fetch address." });
  }
});

app.get("/api/reverse-geocode", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required." });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    const location =
      response.data.results.length > 0
        ? response.data.results[0].geometry.location
        : null;

    if (location) {
      res.json({ lat: location.lat, lng: location.lng });
    } else {
      res.status(404).json({ error: "Location not found." });
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    res.status(500).json({ error: "Failed to fetch coordinates." });
  }
});

app.post("/api/save-address", (req, res) => {
  const address = req.body;
  const formattedAddress = JSON.stringify(address) + "\n";
  fs.appendFile("savedAddresses.txt", formattedAddress, (err) => {
    if (err) {
      return res.status(500).send("Error saving address");
    }
    res.send("Address saved successfully");
  });
});

app.get("/api/saved-addresses", (req, res) => {
  fs.readFile("savedAddresses.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading addresses");
    }
    const addresses = data
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => JSON.parse(line));
    res.json(addresses);
  });
});

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
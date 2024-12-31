# Location/Address Flow Application

A web application that allows users to interact with maps, select locations, and retrieve addresses using Google Maps API. Built with React (Vite) for the frontend and Node.js for the backend.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Installation

Follow the steps below to get your development environment set up:

1. **Clone the repository**:
   git clone https://github.com/idamodhar17/location-address-flow-google-api.git

2. **Navigate to the project directory**:
   cd location-flow

3. **Install dependencies**:
   - For the frontend:
     cd location-flow
     npm install

   - For the backend:
     cd location-flow-backend
     npm install

4. **Set up Google Maps API**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the Google Maps JavaScript API and Geocoding API.
   - Get your API key and set it in the appropriate configuration file.

5. **Start the development servers**:
   - Frontend (React):
     cd location-flow
     npm run dev

   - Backend (Node.js):
     cd location-flow-backend
     node index.js
     ```

## Usage

Once the application is running, navigate to `http://localhost:5173` (or the appropriate port for your setup). You will be able to:
- View the map and interact with it.
- Select a location on the map.
- Retrieve the corresponding address of the selected location.

## Features

- Interactive map interface using Google Maps.
- Location selection with markers on the map.
- Address retrieval using Google Maps Geocoding API.
- Easy-to-use UI built with React.

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **APIs**: Google Maps JavaScript API, Google Geocoding API, Places API, 
- **Other**: npm, Git

## API Integration

### Google Maps JavaScript API
The frontend communicates with Google Maps using the JavaScript API to display an interactive map and place markers.

### Google Geocoding API
The backend integrates with the Google Geocoding API to fetch address information for selected locations.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make changes, and submit a pull request. Please ensure your code follows the existing style and passes all tests.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
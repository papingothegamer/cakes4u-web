import React, { useState } from "react";
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";

const googleMapsApiKey = "AIzaSyC-5by7bTvir_yZHDEPTjm5gvPeZGAkV1Q";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 7.2593711,
  lng: 5.2449409,
};

const LocationSection: React.FC = () => {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const handleMarkerClick = () => {
    setIsInfoWindowOpen(!isInfoWindowOpen);
  };

  const markerIcon = window.google && window.google.maps ? {
    url: "/cake-icon.svg",
    scaledSize: new window.google.maps.Size(40, 40),
  } : null;

  return (
    <section className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Visit Our Sweet Haven
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Info Section */}
          <div className="space-y-6 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-pink-600">Our Location</h3>
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-pink-600" />
              <p className="text-gray-700">123 Sweet Street, Caketown, CT 12345</p>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-pink-600" />
              <p className="text-gray-700">(555) 123-4567</p>
            </div>
            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-pink-600 flex-shrink-0" />
              <div>
                <p className="text-gray-700 font-medium">Opening Hours</p>
                <p className="text-sm text-gray-600">Mon-Fri: 9am - 7pm</p>
                <p className="text-sm text-gray-600">Sat-Sun: 10am - 5pm</p>
              </div>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 text-white bg-pink-600 rounded-full hover:bg-pink-700 transition"
            >
              Get Directions
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </div>

          {/* Map Section */}
          <div className="w-full h-[400px] bg-white rounded-xl shadow-md overflow-hidden relative">
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
                options={{
                  styles: [
                    {
                      featureType: "all",
                      elementType: "geometry.fill",
                      stylers: [{ color: "#FED7E2" }],
                    },
                    {
                      featureType: "poi",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#D53F8C" }],
                    },
                    {
                      featureType: "road",
                      elementType: "geometry",
                      stylers: [{ color: "#FFFFFF" }],
                    },
                  ],
                }}
              >
                {markerIcon && (
                  <Marker
                    position={center}
                    onClick={handleMarkerClick}
                    icon={markerIcon}
                  />
                )}
                {isInfoWindowOpen && (
                  <InfoWindow
                    position={center}
                    onCloseClick={() => setIsInfoWindowOpen(false)}
                  >
                    <div className="p-2">
                      <h3 className="text-sm font-semibold text-pink-600">Cakes4U</h3>
                      <p className="text-xs text-gray-600">Your sweet destination!</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

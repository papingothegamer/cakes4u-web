import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <section className="py-24 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-800 mb-12 text-center"
        >
          Visit Our Sweet Haven
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-pink-600 mb-6">Our Location</h3>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-4 bg-pink-50 p-4 rounded-xl"
            >
              <MapPin className="w-8 h-8 text-pink-600" />
              <p className="text-xl text-gray-700">123 Sweet Street, Caketown, CT 12345</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-4 bg-pink-50 p-4 rounded-xl"
            >
              <Phone className="w-8 h-8 text-pink-600" />
              <p className="text-xl text-gray-700">(555) 123-4567</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-start space-x-4 bg-pink-50 p-4 rounded-xl"
            >
              <Clock className="w-8 h-8 text-pink-600 flex-shrink-0" />
              <div>
                <p className="text-xl text-gray-700 font-medium mb-2">Opening Hours</p>
                <p className="text-lg text-gray-600">Mon-Fri: 9am - 7pm</p>
                <p className="text-lg text-gray-600">Sat-Sun: 10am - 5pm</p>
              </div>
            </motion.div>
            <motion.a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-lg font-medium text-white bg-pink-600 rounded-full hover:bg-pink-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Directions
              <ExternalLink className="ml-2 h-5 w-5" />
            </motion.a>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-[500px] bg-white rounded-2xl shadow-lg overflow-hidden relative"
          >
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
                <AnimatePresence>
                  {isInfoWindowOpen && (
                    <InfoWindow
                      position={center}
                      onCloseClick={() => setIsInfoWindowOpen(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="p-2"
                      >
                        <h3 className="text-lg font-semibold text-pink-600 mb-1">Cakes4U</h3>
                        <p className="text-sm text-gray-600">Your sweet destination!</p>
                      </motion.div>
                    </InfoWindow>
                  )}
                </AnimatePresence>
              </GoogleMap>
            </LoadScript>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

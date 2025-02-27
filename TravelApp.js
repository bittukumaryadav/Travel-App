import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, LogIn, LogOut, MapPin, Plane } from "lucide-react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const indianStates = {
  "Andhra Pradesh": ["Visakhapatnam", "Tirupati", "Vijayawada"],
  "Arunachal Pradesh": ["Tawang", "Itanagar"],
  "Assam": ["Guwahati", "Kaziranga National Park"],
  "Bihar": ["Patna", "Bodh Gaya"],
  "Goa": ["Panaji", "Calangute Beach"],
  "Himachal Pradesh": ["Shimla", "Manali"],
  "Karnataka": ["Bangalore", "Mysore"],
  "Kerala": ["Munnar", "Alleppey"],
  "Madhya Pradesh": ["Bhopal", "Khajuraho"],
  "Maharashtra": ["Mumbai", "Pune"],
  "Rajasthan": ["Jaipur", "Udaipur"],
  "Tamil Nadu": ["Chennai", "Ooty"],
  "Uttar Pradesh": ["Agra", "Varanasi"],
  "West Bengal": ["Kolkata", "Darjeeling"]
};

const flights = {
  "Visakhapatnam": ["IndiGo - ₹5,200", "SpiceJet - ₹5,700"],
  "Tirupati": ["Air India - ₹4,900", "IndiGo - ₹5,400"],
  "Mumbai": ["IndiGo - ₹5,000", "Air India - ₹6,500"],
  "Delhi": ["Vistara - ₹4,800", "SpiceJet - ₹5,300"],
  "Bangalore": ["GoAir - ₹4,500", "IndiGo - ₹5,200"],
  "Kolkata": ["AirAsia - ₹5,700", "SpiceJet - ₹6,200"],
  "Chennai": ["Vistara - ₹4,900", "IndiGo - ₹5,600"],
  "Jaipur": ["IndiGo - ₹5,800", "AirAsia - ₹6,100"]
};

const TravelApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [destination, setDestination] = useState("");
  const [place, setPlace] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showFlights, setShowFlights] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg px-8 py-4 rounded-full tracking-wide transform hover:scale-105 transition-all duration-300 mb-6">🌍 Travel Planner ✈️</h1>
      {isLoggedIn ? (
        <Button onClick={handleLogout} className="flex items-center mb-6">
          <LogOut size={20} className="mr-2" /> Logout
        </Button>
      ) : (
        <Button onClick={handleLogin} className="flex items-center mb-6">
          <LogIn size={20} className="mr-2" /> Login
        </Button>
      )}
      {isLoggedIn && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Calendar size={40} className="text-green-500" />
              <h2 className="text-xl font-semibold mt-4">Select Date</h2>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="mt-4 p-2 border rounded"
                placeholderText="Select Date"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <MapPin size={40} className="text-blue-500" />
              <h2 className="text-xl font-semibold mt-4">Destinations</h2>
              <select
                className="mt-4 p-2 border rounded"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">Select State</option>
                {Object.keys(indianStates).map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {destination && (
                <select
                  className="mt-4 p-2 border rounded"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                >
                  <option value="">Select Place</option>
                  {indianStates[destination].map((place) => (
                    <option key={place} value={place}>{place}</option>
                  ))}
                </select>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Plane size={40} className="text-red-500" />
              <h2 className="text-xl font-semibold mt-4">Flights</h2>
              <Button onClick={() => setShowFlights(true)} className="mt-4">Find Flights</Button>
              {showFlights && place ? (
                flights[place] ? (
                  <ul className="text-gray-600 mt-2">
                    {flights[place].map((flight, index) => (
                      <li key={index}>{flight}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 mt-2">No flights available for this location.</p>
                )
              ) : (
                showFlights && <p className="text-gray-600 mt-2">Select a place to view flights</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TravelApp;

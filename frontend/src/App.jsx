import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SensorDashboard from "./components/SensorDashboard";
import AlertChecker from "./components/CountdownPolling";
import CountdownPage from "./components/EmergencyCountdown";
import Dashboard from "./components/Dashboard";
import AlertCancelled from "./components/Error";
import PotholeAlert from "./components/PotHole";  
import Features from "./components/feature";  

function App() {
  return (
    <Router>
      <Routes>
        {/* Sensor Dashboard (e.g. table of all sensors) */}
        <Route path="/" element={<SensorDashboard />} />

        {/* Page that checks for latest alert periodically */}
        <Route path="/alert-checker" element={<AlertChecker />} />

        {/* Countdown page when alert is triggered */}
       <Route path="/countdown/:alert_id" element={<CountdownPage/>} />

       <Route path="/dashboard/" element={<Dashboard/>} />

       <Route path="/cancelled/" element={<AlertCancelled />} />
       <Route path="/pothole/" element={<PotholeAlert/>} />
       <Route path="/feature/" element={<Features />} />
      </Routes>
    </Router>
  );
}

export default App;


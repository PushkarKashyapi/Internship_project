import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CountdownPolling.css"; // Import the CSS file

export default function AlertChecker() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8000/get-latest-alert/")
        .then((res) => res.json())
        .then((data) => {
          if (data.new_alert) {
            navigate(`/countdown/${data.alert_id}`, {
              state: {
                name: data.name,
                latitude: data.latitude,
                longitude: data.longitude,
              },
            });
          }
        })
        .catch((err) => console.error("Error fetching alert:", err));
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="alert-wrapper">
      <div className="blob-pink"></div>
      <div className="blob-cyan"></div>

      <div className="alert-card">
        <h1>🔔 Emergency Alert System</h1>
        <p>This system is monitoring real-time emergency events around you.</p>
        <p className="checking-text">Checking for updates every 3 seconds...</p>
      </div>
    </div>
  );
}

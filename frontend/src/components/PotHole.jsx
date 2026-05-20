import React, { useEffect, useState } from "react";
import "../Pothole.css";

export default function PotholeAlert() {
  const [message, setMessage] = useState("Connecting...");
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://10.51.94.188:8765");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      setMessage("Listening for potholes...");
      setIsAlert(false);
    };

    ws.onmessage = (event) => {
      console.log("Received:", event.data);
      setMessage(event.data);

      if (event.data.toLowerCase().includes("pothole")) {
        setIsAlert(true);
      } else {
        setIsAlert(false);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setMessage("WebSocket error");
      setIsAlert(true);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setMessage("Disconnected from WebSocket");
      setIsAlert(true);
    };

    return () => ws.close();
  }, []);

  return (
    <div className="pothole-container">
      <div className={`pothole-box ${isAlert ? "alert" : ""}`}>
        <h1 className="pothole-title">Pothole Detection</h1>
        <p className={`pothole-message ${isAlert ? "alert" : ""}`}>
          {message}
        </p>
      </div>
    </div>
  );
}

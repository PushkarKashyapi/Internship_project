import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchLatestAlert = async () => {
      try {
        const response = await axios.get("http://localhost:8000/get-latest-alert/");
        setAlert(response.data);
      } catch (error) {
        console.error("Failed to fetch emergency alert:", error);
      }
    };

    fetchLatestAlert();
  }, []);

  if (!alert)
    return (
      <div
        style={{
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
          color: "#fff",
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading alert...
      </div>
    );

  return (
    <div
      style={{
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        color: "#fff",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <h1 style={{ fontSize: "32px", color: "#ff8fa3", marginBottom: "10px" }}>
        🚨 Emergency Detected
      </h1>

      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          padding: "20px",
          borderLeft: "5px solid #ff4e50",
          borderRadius: "10px",
          marginBottom: "10px",
          maxWidth: "700px",
          width: "100%",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        <strong>{alert.user_name}</strong> may have fallen. Coordinates detected:
        <br />
        Latitude: <strong>{alert.latitude}</strong>, Longitude:{" "}
        <strong>{alert.longitude}</strong>
      </div>

      <iframe
        src={`https://maps.google.com/maps?q=${alert.latitude},${alert.longitude}&z=16&output=embed`}
        allowFullScreen
        title="Google Map"
        style={{
          flexGrow: 1,
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          border: "none",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          marginBottom: "10px",
        }}
      ></iframe>

      <a
        href={`https://maps.google.com/?q=${alert.latitude},${alert.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: "10px 20px",
          backgroundColor: "#00ffd5",
          color: "#000",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          transition: "background-color 0.3s",
          marginTop: "10px",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#00c9a7")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#00ffd5")}
      >
        📍 Open in Google Maps
      </a>
    </div>
  );
};

export default Dashboard;

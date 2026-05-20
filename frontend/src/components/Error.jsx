import React from "react";

export default function AlertCancelled() {
  const containerStyle = {
    margin: 0,
    padding: 0,
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "36px",
    color: "#ff8fa3",
    marginBottom: "10px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>
        Alert Cancelled Successfully, It was a wrong call handled successfully
      </h1>
    </div>
  );
}

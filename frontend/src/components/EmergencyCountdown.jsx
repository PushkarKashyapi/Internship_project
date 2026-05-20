import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CountdownPage() {
  const { alert_id } = useParams();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(10);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(id);
          sendAlert();
        }
        return prevTime - 1;
      });
    }, 1000);

    setIntervalId(id);
    return () => clearInterval(id);
  }, []);

  const sendAlert = () => {
    fetch("http://127.0.0.1:8000/confirm-alert/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alert_id }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Alert sent to emergency contact!");
        navigate("/dashboard/");
      })
      .catch((err) => {
        console.error("Failed to confirm alert:", err);
        alert("Something went wrong!");
      });
  };

  const cancelAlert = () => {
    clearInterval(intervalId);
    alert("Emergency alert canceled.");
    navigate("/cancelled");
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Emergency Detected</h1>
        <p style={styles.text}>We will notify your emergency contact in:</p>
        <div style={styles.timer}>{timeLeft}</div>
        <button style={styles.button} onClick={cancelAlert}>
          Cancel Alert
        </button>
      </div>
    </div>
  );
}

const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  container: {
    width: "100%",
    height: "100%",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  heading: {
    fontSize: "42px",
    color: "#ff8fa3",
    marginBottom: "20px",
    textAlign: "center",
  },
  text: {
    fontSize: "20px",
    color: "#eee",
    marginBottom: "20px",
    textAlign: "center",
  },
  timer: {
    fontSize: "72px",
    fontWeight: "bold",
    color: "#ffeb3b",
    margin: "20px 0",
  },
  button: {
    backgroundColor: "#ff4e50",
    color: "#fff",
    fontWeight: "bold",
    padding: "15px 40px",
    border: "none",
    borderRadius: "12px",
    fontSize: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
  },
};

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../feature.css";

const Features = () => {
  return (
    <div className="container custom-container">
      <div className="card-deck">
        <div className="card">
          <img
            src="/src/assets/sensor.png"
            className="card-img-top"
            alt="Sensor Data"
          />
          <div className="card-body">
            <h5 className="card-title">Environmental Tracker</h5>
            <p className="card-text">
              Tracks environmental parameters (like temperature, pollution)
              along with real-time location updates for situational awareness.
            </p>
            <button className="btn btn-outline-light mt-2">On</button>
          </div>
          <div className="card-footer">
            <small>Last updated 3 mins ago</small>
          </div>
        </div>

        <div className="card">
          <img
            src="/src/assets/emergency.png"
            className="card-img-top"
            alt="Fall Detection"
          />
          <div className="card-body">
            <h5 className="card-title">Emergency Alert</h5>
            <p className="card-text">
              Detects sudden impact or fall using sensors and automatically
              sends an emergency alert with location data.
            </p>
            <button className="btn btn-outline-light mt-2">On</button>
          </div>
          <div className="card-footer">
            <small>Last updated 3 mins ago</small>
          </div>
        </div>

        <div className="card">
          <img
            src="/src/assets/pothole.png"
            className="card-img-top"
            alt="Pothole Detector"
          />
          <div className="card-body">
            <h5 className="card-title">PotHole Detector</h5>
            <p className="card-text">
              Detects sudden impact or fall using sensors and automatically
              sends an emergency alert with location data.
            </p>
            <button className="btn btn-outline-light mt-2">On</button>
          </div>
          <div className="card-footer">
            <small>Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

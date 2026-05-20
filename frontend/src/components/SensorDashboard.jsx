import React, { useEffect, useState } from 'react';

const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/showdata/')
      .then((res) => res.json())
      .then((data) => {
        setSensorData(data.sensor_data);
        setMessage(data.message);
      })
      .catch((err) => console.error('Error fetching sensor data:', err));
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        width: '90%',
        maxWidth: '1000px',
        height: '90%',
        padding: '30px',
        color: '#fff',
        overflowY: 'auto'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>IoT Sensor Dashboard</h1>
        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Message: {message}</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'rgba(255, 255, 255, 0.05)'
        }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Temperature</th>
              <th style={thStyle}>Humidity</th>
              <th style={thStyle}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.length > 0 ? (
              sensorData.map((record) => (
                <tr key={record.id}>
                  <td style={tdStyle}>{record.name}</td>
                  <td style={tdStyle}>{record.temperature}</td>
                  <td style={tdStyle}>{record.humidity}</td>
                  <td style={tdStyle}>{record.timestamp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = {
  padding: '12px 15px',
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  fontWeight: 'bold',
  textAlign: 'left'
};

const tdStyle = {
  padding: '10px 15px',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  textAlign: 'left'
};

export default SensorDashboard;

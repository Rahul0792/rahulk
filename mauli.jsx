import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [devices, setDevices] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    url: ""
  });
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  // Dummy Device List (You can replace with GET API)
  useEffect(() => {
    setDevices([
      { id: 1, name: "Laptop", status: "Active" },
      { id: 2, name: "Mobile", status: "Inactive" },
      { id: 3, name: "Tablet", status: "Active" }
    ]);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setNotification(null);

    try {
      const response = await fetch(formData.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      setNotification("✅ Data submitted successfully!");
      setDevices([...devices, { id: devices.length + 1, name: formData.username, status: "Active" }]);
    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h2>Device Manager</h2>
        <ul>
          <li onClick={() => setActivePage("home")}>Home</li>
          <li onClick={() => setActivePage("devices")}>Devices</li>
          <li onClick={() => setActivePage("add")}>Add Device</li>
        </ul>
      </nav>

      {notification && <div className="notification success">{notification}</div>}
      {error && <div className="notification error">{error}</div>}

      {activePage === "home" && (
        <div className="card">
          <h3>Welcome</h3>
          <p>This is a fully responsive React application.</p>
        </div>
      )}

      {activePage === "devices" && (
        <div className="card">
          <h3>Device List</h3>
          <ul className="device-list">
            {devices.map((device) => (
              <li key={device.id}>
                {device.name} - {device.status}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activePage === "add" && (
        <div className="card">
          <h3>Add Device (POST API)</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="url"
              placeholder="API URL"
              required
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;



*******************************************************app.css***************************************************************************

  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.container {
  min-height: 100vh;
  background: #f4f6f9;
}

.navbar {
  background: #1e293b;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.navbar li {
  cursor: pointer;
  transition: 0.3s;
}

.navbar li:hover {
  color: #38bdf8;
}

.card {
  background: white;
  margin: 30px auto;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
}

.device-list {
  list-style: none;
  margin-top: 10px;
}

.device-list li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #1d4ed8;
}

.notification {
  margin: 15px auto;
  padding: 10px;
  width: 90%;
  max-width: 600px;
  text-align: center;
  border-radius: 5px;
}

.success {
  background: #d1fae5;
  color: #065f46;
}

.error {
  background: #fee2e2;
  color: #991b1b;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar ul {
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  .card {
    width: 95%;
  }
}

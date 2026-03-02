import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [devices, setDevices] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    url: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setDevices([
      { id: 1, name: "Laptop" },
      { id: 2, name: "Mobile" }
    ]);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(form.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password
        })
      });

      if (!response.ok) {
        throw new Error("API Error");
      }

      await response.json();

      setDevices([...devices, { id: devices.length + 1, name: form.username }]);
      setMessage("Data submitted successfully");
      setForm({ username: "", password: "", url: "" });

    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h2>Device App</h2>
        <ul>
          <li onClick={() => setPage("home")}>Home</li>
          <li onClick={() => setPage("devices")}>Devices</li>
          <li onClick={() => setPage("add")}>Add</li>
        </ul>
      </nav>

      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      {page === "home" && (
        <div className="card">
          <h3>Welcome</h3>
        </div>
      )}

      {page === "devices" && (
        <div className="card">
          <h3>Device List</h3>
          <ul>
            {devices.map((d) => (
              <li key={d.id}>{d.name}</li>
            ))}
          </ul>
        </div>
      )}

      {page === "add" && (
        <div className="card">
          <h3>Add Device</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="url"
              placeholder="API URL"
              value={form.url}
              onChange={handleChange}
              required
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
  font-family: Arial;
}

.container {
  min-height: 100vh;
  background: #f5f5f5;
}

.navbar {
  background: #1e3a8a;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 15px;
}

.navbar li {
  cursor: pointer;
}

.card {
  background: white;
  margin: 20px auto;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 8px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.success {
  background: #d1fae5;
  padding: 10px;
  text-align: center;
  margin: 10px;
}

.error {
  background: #fee2e2;
  padding: 10px;
  text-align: center;
  margin: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar ul {
    flex-direction: column;
    margin-top: 10px;
  }
}

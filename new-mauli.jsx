import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [devices, setDevices] = useState([
    { id: 1, name: "Laptop" },
    { id: 2, name: "Mobile" }
  ]);

  const [registeredUser, setRegisteredUser] = useState({
    email: "rahul@gmail.com",
    password: "123"
  });

  const [notifications, setNotifications] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (
        email !== registeredUser.email ||
        password !== registeredUser.password
      ) {
        setError("Invalid email or password");
        return;
      }

      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }
      );

      if (!res.ok) throw new Error("Login API Failed");

      const data = await res.json();

      setUser({ email });
      setMessage("Login Successful");
      setNotifications([
        ...notifications,
        "User logged in: " + email
      ]);
      setPage("dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: regEmail,
            password: regPassword
          })
        }
      );

      if (!res.ok) throw new Error("Register API Failed");

      await res.json();

      setRegisteredUser({
        email: regEmail,
        password: regPassword
      });

      setMessage("Register Successful");
      setPage("login");
    } catch (err) {
      setError(err.message);
    }
  };

  const addDevice = async () => {
    setError("");
    setMessage("");

    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.email,
            device: "New Device"
          })
        }
      );

      if (!res.ok) throw new Error("Device API Failed");

      const data = await res.json();

      const newDevice = {
        id: devices.length + 1,
        name: "Device " + data.id
      };

      setDevices([...devices, newDevice]);
      setNotifications([
        ...notifications,
        "Device added successfully"
      ]);
      setMessage("Device Added");
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    setUser(null);
    setPage("welcome");
  };

  return (
    <div className="app">

      <header className="header">
        <h2>MyApp</h2>
        {user && <button onClick={logout}>Logout</button>}
      </header>

      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      {page === "welcome" && (
        <div className="center">
          <div className="card">
            <h1>Welcome</h1>
            <button onClick={() => setPage("login")}>Login</button>
            <button onClick={() => setPage("register")}>Register</button>
          </div>
        </div>
      )}

      {page === "login" && (
        <div className="center">
          <form className="card" onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" required placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" required placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Login</button>
          </form>
        </div>
      )}

      {page === "register" && (
        <div className="center">
          <form className="card" onSubmit={handleRegister}>
            <h2>Register</h2>
            <input type="email" required placeholder="Email"
              value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
            <input type="password" required placeholder="Password"
              value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
            <button>Register</button>
          </form>
        </div>
      )}

      {page === "dashboard" && (
        <div className="dashboard">

          <aside className="sidebar">
            <p onClick={() => setPage("dashboard")}>Home</p>
            <p onClick={() => setPage("devices")}>Devices</p>
            <p onClick={() => setPage("notification")}>Notification</p>
            <p onClick={logout}>Logout</p>
          </aside>

          <main className="main">
            <h2>Welcome {user?.email}</h2>
            <button onClick={addDevice}>Add Device (POST API)</button>
          </main>
        </div>
      )}

      {page === "devices" && (
        <div className="dashboard">
          <aside className="sidebar">
            <p onClick={() => setPage("dashboard")}>Home</p>
            <p onClick={() => setPage("devices")}>Devices</p>
            <p onClick={() => setPage("notification")}>Notification</p>
            <p onClick={logout}>Logout</p>
          </aside>

          <main className="main">
            <h2>Device List</h2>
            {devices.map((d) => (
              <div key={d.id} className="device-box">
                {d.name}
              </div>
            ))}
          </main>
        </div>
      )}

      {page === "notification" && (
        <div className="dashboard">
          <aside className="sidebar">
            <p onClick={() => setPage("dashboard")}>Home</p>
            <p onClick={() => setPage("devices")}>Devices</p>
            <p onClick={() => setPage("notification")}>Notification</p>
            <p onClick={logout}>Logout</p>
          </aside>

          <main className="main">
            <h2>Notifications</h2>
            {notifications.map((n, i) => (
              <div key={i} className="notification">
                {n}
              </div>
            ))}
          </main>
        </div>
      )}

      <footer className="footer">
        © 2026 MyApp
      </footer>
    </div>
  );
}

*****************************************************App.css********************************************************


  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
  width: 100%;
}

.app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f4f6f9;
}

/* Header */
.header {
  background: #111;
  color: white;
  padding: 15px 60px;   /* more laptop spacing */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Footer */
.footer {
  background: #111;
  color: white;
  padding: 15px;
  text-align: center;
  margin-top: auto;
}

/* Center Forms */
.center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;   /* better vertical spacing */
}

.card {
  background: white;
  padding: 40px;
  width: 420px;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 12px;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
}

button:hover {
  background: #333;
}

/* Messages */
.success {
  background: #d1fae5;
  padding: 12px;
  text-align: center;
  border-radius: 5px;
}

.error {
  background: #fee2e2;
  padding: 12px;
  text-align: center;
  border-radius: 5px;
}

/* Dashboard Layout */
.dashboard {
  flex: 1;
  display: flex;
  width: 100%;
  max-width: 1400px;   /* bigger laptop support */
  margin: 40px auto;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
}

/* Sidebar */
.sidebar {
  width: 240px;
  background: #f1f1f1;
  padding: 30px;
}

.sidebar p {
  margin: 18px 0;
  cursor: pointer;
  font-weight: 500;
}

.sidebar p:hover {
  color: black;
}

/* Main Content */
.main {
  flex: 1;
  padding: 50px;
}

/* Device Box */
.device-box {
  background: #e5e7eb;
  padding: 18px;
  margin: 12px 0;
  border-radius: 8px;
}

/* Notification */
.notification {
  background: #c7eaff;
  padding: 12px;
  margin: 12px 0;
  border-radius: 6px;
}

/* Responsive */
@media (max-width: 1024px) {
  .dashboard {
    margin: 20px;
  }
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
    margin: 10px;
  }

  .sidebar {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .main {
    padding: 25px;
  }

  .card {
    width: 100%;
  }
}

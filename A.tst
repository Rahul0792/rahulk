import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  // ------------------- GET Notifications -------------------
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await res.json();
      setNotifications(data.slice(0, 5));
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ------------------- LOGIN -------------------
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 201) {
        setUser({ email });
        alert("Login Successful");
        setPage("dashboard");
        fetchNotifications();
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      alert("Server Error");
    }
  };

  // ------------------- REGISTER -------------------
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: regEmail, password: regPassword }),
      });

      if (res.status === 201) {
        alert("Register Successful");
        setPage("login");
      } else {
        alert("Register Failed");
      }
    } catch {
      alert("Server Error");
    }
  };

  // ------------------- DELETE Notification -------------------
  const deleteNotification = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setNotifications(
          notifications.filter((item) => item.id !== id)
        );
      } else {
        alert("Delete Failed");
      }
    } catch {
      alert("Server Error");
    }
  };

  const logout = () => {
    setUser(null);
    setPage("welcome");
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h2>MyApp</h2>
        {user && <button onClick={logout}>Logout</button>}
      </header>

      {/* Welcome */}
      {page === "welcome" && (
        <div className="center">
          <div className="card">
            <h1>Welcome</h1>
            <button onClick={() => setPage("login")}>Login</button>
            <button onClick={() => setPage("register")}>Register</button>
          </div>
        </div>
      )}

      {/* Login */}
      {page === "login" && (
        <div className="center">
          <form className="card" onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="email"
              required
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
        </div>
      )}

      {/* Register */}
      {page === "register" && (
        <div className="center">
          <form className="card" onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
              type="email"
              required
              placeholder="Enter email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Enter password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
            <button>Register</button>
          </form>
        </div>
      )}

      {/* Dashboard */}
      {user && page !== "welcome" && page !== "login" && page !== "register" && (
        <div className="dashboard">

          <aside className="sidebar">
            <p onClick={() => setPage("dashboard")}>Home</p>
            <p onClick={() => setPage("notification")}>Notifications</p>
            <p onClick={logout}>Logout</p>
          </aside>

          <main className="main">
            {page === "dashboard" && (
              <>
                <h1>Welcome {user.email}</h1>
                <div className="box">Dashboard Content</div>
              </>
            )}

            {page === "notification" && (
              <>
                <h2>Notifications</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  notifications.map((item) => (
                    <div key={item.id} className="notification">
                      <p>{item.title}</p>
                      <button onClick={() => deleteNotification(item.id)}>
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </>
            )}
          </main>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        © 2026 MyApp. All Rights Reserved.
      </footer>
    </div>
  );
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  font-family: Arial;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: black;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

.footer {
  background: black;
  color: white;
  padding: 10px;
  text-align: center;
  margin-top: auto;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.card {
  background: white;
  padding: 30px;
  width: 90%;
  max-width: 350px;
  box-shadow: 0 0 10px gray;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
}

button {
  padding: 8px;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
}

.dashboard {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 220px;
  background: #eee;
  padding: 20px;
}

.sidebar p {
  margin: 15px 0;
  cursor: pointer;
}

.main {
  flex: 1;
  padding: 20px;
}

.box {
  background: lightgray;
  padding: 20px;
  margin-top: 20px;
}

.notification {
  background: lightblue;
  padding: 15px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .notification {
    flex-direction: column;
    gap: 10px;
  }
}
              

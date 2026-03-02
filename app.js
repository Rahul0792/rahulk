import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [user, setUser] = useState(null);


  const [registeredUser, setRegisteredUser] = useState({
    email: "rahul@gmail.com",
    password: "123",
  });

  const [notifications, setNotifications] = useState([
    "Welcome to MyApp",
    "Login Successful",
    "New Notification received",
  ]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (
        email !== registeredUser.email ||
        password !== registeredUser.password
      ) {
        alert("Invalid email or password");
        return;
      }

      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      setUser({
        name: "Rahul Khilari",
        email: email,
      });

      alert("Login Successful");
      setPage("dashboard");
    } catch (error) {
      alert("API Error");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: regEmail,
        password: regPassword,
      }),
    });

    const data = await res.json();

    console.log("Register API:", data);

  
    setRegisteredUser({
      email: regEmail,
      password: regPassword,
    });


    alert("Register Successful");
    setPage("login");
  };

  const logout = () => {
    setUser(null);
    setPage("welcome");
  };

  return (
    <div className="app">

      {/*  ------------------  Header container ---------------- */}
      <header className="header">
        <h2>MyApp</h2>
        {user && <button onClick={logout}>Logout</button>}
      </header>


{/* ----------------------   Welcome Container   --------------------- */}
      {page === "welcome" && (
        <div className="center">
          <div className="card">
            <h1>Welcome</h1>
            <button onClick={() => setPage("login")}>Login</button>
            <button onClick={() => setPage("register")}>Register</button>

          </div>
        </div>
      )}


{/* ------------------  Login Container ---------------------------------------- */}


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


{/* ------------------------  Register Container ----------------- */}
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

      {/* ----------------------Dashboard Container -------------------*/}
      {page === "dashboard" && (
        <div className="dashboard">

          <aside className="sidebar">
            <p onClick={() => setPage("dashboard")}>Home</p>
            <p onClick={() => setPage("notification")}>Notification</p>
            <p onClick={logout}>Logout</p>
          </aside>

          <main className="main">
            <h1>Welcome {user?.email}</h1>

            <div className="box">Dashboard Content</div>
          </main>
        </div>
      )}



{/* -----------  Notification Container----------------- */}
      {page === "notification" && (
        <div className="dashboard">
          <aside className="sidebar">
            <p onClick={() => setPage("dashboard")}>Home</p>
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


{/* -----------------Footer container  -------------------*/}
      <footer className="footer">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, pariatur.</footer>
    </div>
  );
}


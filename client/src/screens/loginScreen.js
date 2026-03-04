import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function LoginScreen({ setUserInfo }) {
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUserInfo(data);
      navigate(redirect);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sign In</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Sign In</button>
      </form>

      <p>
        New Customer? <Link to="/">Go Back</Link>
      </p>
    </div>
  );
}

export default LoginScreen;
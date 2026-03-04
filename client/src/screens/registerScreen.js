import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RegisterScreen({ setUserInfo }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect");

  const submitHandler = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
    };

    setUserInfo(newUser);
    localStorage.setItem("userInfo", JSON.stringify(newUser));

    if (redirect) {
      navigate(`/${redirect}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterScreen;
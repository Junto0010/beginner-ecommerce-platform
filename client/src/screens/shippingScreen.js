import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShippingScreen({ userInfo }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=shipping");
    }
  }, [userInfo, navigate]);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ address, city, postalCode, country })
    );

    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shipping</h1>

      <form onSubmit={submitHandler}>
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default ShippingScreen;
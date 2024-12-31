import React, { useState, useEffect } from "react";
import styles from "./AddressFormStyles";

const AddressForm = ({ onSave, selectedAddress }) => {
  // State for form inputs
  const [details, setDetails] = useState({
    houseNumber: "",
    area: "",
    category: "Home",
    address: selectedAddress || "",
  });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setDetails((prev) => ({ ...prev, address: selectedAddress }));
  }, [selectedAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(details);
  };

  return (
    <form style={styles.formContainer} onSubmit={handleSubmit}>

      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="houseNumber">
          House/Flat No.:
        </label>
        <input
          id="houseNumber"
          style={styles.inputField}
          type="text"
          name="houseNumber"
          value={details.houseNumber}
          onChange={handleChange}
          placeholder="Enter house/flat number"
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="area">
          Apartment/Area:
        </label>
        <input
          id="area"
          style={styles.inputField}
          type="text"
          name="area"
          value={details.area}
          onChange={handleChange}
          placeholder="Enter apartment or area"
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="category">
          Category:
        </label>
        <select
          id="category"
          style={styles.selectField}
          name="category"
          value={details.category}
          onChange={handleChange}
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Friends & Family">Friends & Family</option>
        </select>
      </div>

      <button
        type="submit"
        style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Save Address
      </button>
    </form>
  );
};

export default AddressForm;

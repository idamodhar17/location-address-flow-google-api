import React, { useState } from "react"

const AddressForm = ({ onSave }) => {
    const [details, setDetails] = useState({
        houseNumber: "",
        area: "",
        category: "Home",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(details);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <div>
                <label>House/Flat No.:</label>
                <input
                    type="text"
                    name="houseNumber"
                    value={details.houseNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Apartment/Area:</label>
                <input
                    type="text"
                    name="area"
                    value={details.area}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Category:</label>
                <select
                    name="category"
                    value={details.category}
                    onChange={handleChange}
                >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Friends & Family">Friends & Family</option>
                </select>
            </div>
            <button type="submit">Save Address</button>
        </form>
    );
}

export default AddressForm;
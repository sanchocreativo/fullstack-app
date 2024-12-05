import React, { useState } from "react";
import axios from "axios";

const AddUserForm = (props) => {
  const initialFormState = { id: null, name: "", email: "" };
  const [user, setData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    const newErrors = { ...errors };

    if (field === "name" || !field) {
      if (!value?.trim()) {
        newErrors.name = "Name is required.";
      } else {
        delete newErrors.name;
      }
    }

    if (field === "email" || !field) {
      if (!value?.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Email is invalid.";
      } else {
        delete newErrors.email;
      }
    }

    return newErrors;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update user state
    setData({ ...user, [name]: value });

    // Validate the specific field
    setErrors(validate(name, value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate all fields before submission
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors if inputs are valid
    setErrors({});

    axios
      .post("https://backend-purple-feather-9888.fly.dev/users", user)
      .then(() => console.log("User Created"))
      .catch((err) => {
        console.error(err);
      });

    props.addUser(user);
    setData(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <button type="submit">Add new user</button>
    </form>
  );
};

export default AddUserForm;

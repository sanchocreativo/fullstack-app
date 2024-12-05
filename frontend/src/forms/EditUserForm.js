import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUser(props.currentUser);
  }, [props.currentUser]);

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
    setUser({ ...user, [name]: value });

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
      .put(`https://backend-purple-feather-9888.fly.dev/users/${user.id}`, user)
      .then(() => console.log("User Updated"))
      .catch((err) => {
        console.error(err);
      });

    props.updateUser(user.id, user);
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
      <button type="submit" className="edit">Update user</button>
      <button
        type="button"
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;

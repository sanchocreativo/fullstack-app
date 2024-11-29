import React, { useState } from "react";
import axios from "axios";

const AddUserForm = (props) => {
  const initialFormState = { id: null, name: "", email: "" };
  const [user, setData] = useState(initialFormState);

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setData({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        axios
          .post("https://backend-purple-feather-9888.fly.dev/users", user)
          .then(() => console.log("User Created"))
          .catch((err) => {
            console.error(err);
          });
        event.preventDefault();
        if (!user.name || !user.email) return;

        props.addUser(user);
        setData(initialFormState);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
      />
      <label>email</label>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleInputChange}
      />
      <button>Add new user</button>
    </form>
  );
};

export default AddUserForm;

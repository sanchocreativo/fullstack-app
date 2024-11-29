import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
    event.preventDefault();
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        axios
          .put(
            `https://backend-purple-feather-9888.fly.dev/users/${user.id}`,
            user
          )
          .then(() => console.log("User Updated"))
          .catch((err) => {
            console.error(err);
          });
        props.updateUser(user.id, user);
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
      <button>Update user</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;

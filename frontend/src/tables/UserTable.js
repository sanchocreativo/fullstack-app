import React from "react";
import axios from "axios";

const UserTable = (props) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.data &&
        props.data.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(user);
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  axios
                    .delete(
                      `https://backend-purple-feather-9888.fly.dev/users/${user.id}`,
                      user
                    )
                    .then(() => console.log("User Deleted"))
                    .catch((err) => {
                      console.error(err);
                    });
                  props.deleteUser(user.id, user);
                }}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default UserTable;

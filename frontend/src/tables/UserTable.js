import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ConfirmModal from "../modals/ConfirmModal";

const UserTable = ({ data, loading, editRow, deleteUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedUserId !== null) {
      deleteUser(selectedUserId);
    }
    closeModal();
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array(5)
                .fill()
                .map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton width={100} />
                    </td>
                    <td>
                      <Skeleton width={200} />
                    </td>
                    <td>
                      <Skeleton width={150} />
                    </td>
                  </tr>
                ))
            : data && data.length > 0
            ? data.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => editRow(user)}
                      className="button muted-button edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        openModal(user.id);
                      }}
                      className="button muted-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : (
              <tr>
                <td colSpan={3}>No users found</td>
              </tr>
            )}
        </tbody>
      </table>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this user?"
      />
    </>
  );
};

export default UserTable;

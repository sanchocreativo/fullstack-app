import React from "react";
import ReactDOM from "react-dom";
import "./ConfirmModal.css"; 

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <p>{message || "Are you sure?"}</p>
        <div className="modal-actions">
          <button className="button confirm-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="button cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;

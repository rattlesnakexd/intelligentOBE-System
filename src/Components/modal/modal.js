import React, { useState } from 'react';
import './modal.css';

const Modal = ({openModal, setOpenModal, title}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the desired action with the form data
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    // Clear the form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleCancel = () => {
    setOpenModal(false);
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Data</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="modal-buttons">
            <button type="submit">Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

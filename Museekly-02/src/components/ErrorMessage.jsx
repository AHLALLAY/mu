// src/components/ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <p>{message || "Une erreur s'est produite."}</p>
    </div>
  );
};

export default ErrorMessage;
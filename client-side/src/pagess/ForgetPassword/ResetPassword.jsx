import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the server to initiate the password reset process
      const response = await axios.post('api/forgot-password', { email });

      // Display a success message to the user
      setMessage(response.data.msg);
    } catch (error) {
      // Display an error message if the request fails
      setMessage(error.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleForgetPassword}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ResetPassword;
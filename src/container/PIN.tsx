import React, { useState } from 'react';

const PinComponent = () => {
  const [pin, setPin] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handlePinChange = (event) => {
    setPin(event.target.value);
    if (!localStorage.getItem("pin")) {
      localStorage.setItem("pin", event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Enter Your PIN</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={pin}
            onChange={handlePinChange}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter PIN"
            maxLength="6"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        {submitted && (
          <div className="mt-4 text-center text-lg text-green-600">
            <p>Your PIN was submitted successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinComponent;

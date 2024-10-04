import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import { register } from '../api'; // Adjust the import based on your file structure

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();  // Initialize the useNavigate hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const { data } = await register(formData);
          console.log('API Response Data:', data);  // Log the API response data to see if the token exists
  
          if (data.token) {
              localStorage.setItem('token', data.token);  // Store token in localStorage
              setSuccess('Registration successful!');
              setError(null);
              navigate('/');  // Redirect to homepage
          } else {
              setError('No token received.');
          }
      } catch (error) {
          console.error('Error during registration:', error);  // Log error for better debugging
          setError('Registration failed. Please try again.');
          setSuccess(null);
      }
  };
  

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-white text-center mb-8">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input 
                            type="text" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            placeholder="Username" 
                            required 
                            className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="Email" 
                            required 
                            className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder="Password" 
                            required 
                            className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <button 
                            type="submit" 
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-md transition-colors duration-300"
                        >
                            Register
                        </button>
                    </div>
                </form>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
            </div>
        </div>
    );
};

export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import { login } from '../api';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Initialize the useNavigate hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(formData);
            localStorage.setItem('token', data.token);  // Store JWT token in localStorage
            navigate('/');  // Redirect to the homepage after successful login
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-white text-center mb-8">Login</h1>
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
                            Login
                        </button>
                    </div>
                </form>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default Login;


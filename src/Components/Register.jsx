import React from 'react'
import signup from '../Images/signup.jpg';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Register() {
    const bodyStyle = {
        backgroundImage: `url(${signup})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        backgroundAttachment: 'fixed',
        overflowY: 'auto',
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState({})
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/users/signup/", formData)
            console.log("User Registered : ", response.data)
            navigate("/login")
        }
        catch (error) {
            console.log(error.response.data)
            if (error.response && error.response.data.passwords) {

                alert(error.response.data.passwords)
            } else if (error.response && error.response.data.email) {
                alert("Email Field : " + error.response.data.email)
            }
            else if (error.response && error.response.data.password) {
                alert("Password Field :" + error.response.data.password)
            }
            else {
                alert(error.message)
            }

        }
    }

    return (
        <div
            style={bodyStyle} className="flex justify-center items-center h-screen ">
            <div className="max-w-xl mx-auto px-6 py-8 bg-white shadow-md rounded-md ">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>
                <form className="space-y-4 " onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" >Name</label>
                        <input type="text" name="username" onChange={handleChange} className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" onChange={handleChange} className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Email" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="text" name="phone" onChange={handleChange} className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Phone Number" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="password" onChange={handleChange} className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Password" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" name="confirm_password" onChange={handleChange} className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Confirm Password" />
                    </div>
                    <div>
                        <button type="submit" className="my-3  w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-black hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                            Sign Up
                        </button>
                        <p className="text-primary ">Already have an account? <span className="hover:underline" onClick={() => navigate('/login')}>Login</span> </p>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Register
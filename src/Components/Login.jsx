import React, { useState } from 'react';
import drimage from '../Images/drimage.jpg';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login, resetPass } from '../authSlice/authSlice'
import { api } from '../api/api';
import SendEmail from './OTP';



function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const bodyStyle = {
        backgroundImage: `url(${drimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        backgroundAttachment: 'fixed',
        overflowY: 'auto',
    };

    const [formData, setFormData] = useState({})



    const isresetPass = useSelector(state => state.auth.resetPass)
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post("login/", formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data)
            const accessToken = response.data.access
            const refreshToken = response.data.refresh
            dispatch(login({ accessToken, refreshToken }))

            navigate('/')
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.detail || "Invalid Email or Password")
            }
            else {
                alert("Login failed !! Please try again...")
            }
        }
    }

    const handlePass = () => {


        dispatch(resetPass(true))
    }


    return (
        <div style={bodyStyle} className="flex justify-center items-center h-screen ">
            {isresetPass ?

                //Email Form for Password Reset

                <SendEmail /> :

                //Sign In Form

                <div className="max-w-xl mx-auto px-6 py-8 bg-white shadow-md rounded-md">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign In</h1>
                    <form className="space-y-4 " onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" onChange={handleChange} name="email" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Email" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" onChange={handleChange} name="password" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Password" />
                        </div>
                        <div>
                            <button type="submit" className="my-3  w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-black hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                Sign in
                            </button>
                        </div>
                        <div className="text-center">
                            <p className="text-primary ">Don't have an account? <span className="hover:underline" onClick={() => navigate('/signup')}>Sign up</span></p>
                        </div>
                        <div className="text-center">
                            <a className="text-primary hover:underline" onClick={handlePass}>Forgot password?</a>
                        </div>
                    </form>
                </div>}
        </div>

    );
}

export default Login;

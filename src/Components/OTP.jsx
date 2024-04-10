import React, { useState } from 'react';
import { api } from '../api/api';
import { useDispatch, useSelector } from 'react-redux'
import { otpView, resetPass } from '../authSlice/authSlice';
import { useNavigate } from "react-router-dom"
function SendEmail() {
    const [email, setEmail] = useState({ "email": "" })
    const [formval, setFormval] = useState({ "otp": "", "password": "", "confirm_password": "" })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isotpView = useSelector(state => state.auth.otpView)
    const handleEmail = (e) => {
        e.preventDefault()
        setEmail({ ...email, [e.target.name]: e.target.value })
    }

    const handleResetEmail = async (e) => {
        e.preventDefault()

        try {


            const response = await api.post("resetEmail/", email)
            console.log(response.data)
            if (response.data.error) {
                alert(response.data.error)
            }
            else {

                dispatch(otpView(true))
            }



        } catch (error) {
            alert(error.message)
        }
    }

    const handleFormval = (e) => {
        setFormval({ ...formval, [e.target.name]: e.target.value })

    }

    const handleNewpass = async (e) => {
        e.preventDefault()
        console.log(formval)
        try {
            const response = await api.post("resetPassword/", formval)
            if (response && response.data.error) {
                alert(response.data.error)
            }
            else {

                dispatch(resetPass(false))
                dispatch(otpView(false))
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>

            {isotpView ? <div className="max-w-xl mx-auto px-6 py-8 bg-white shadow-md rounded-md">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">OTP</h1>
                <form className="space-y-4 " onSubmit={handleNewpass} >
                    <div className='flex items-center justify-center flex-col'>
                        <label className="block text-sm font-medium text-gray-500 mb-2" >OTP</label>
                        <input value={formval.otp} type="text" name="otp" onChange={handleFormval} className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter OTP" />
                    </div>
                    <div className='flex items-center justify-center flex-col'>
                        <label className="block text-sm font-medium text-gray-500 mb-2" >New Password</label>
                        <input value={formval.password} onChange={handleFormval} type="password" name="password" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter the New Password" />
                    </div>
                    <div className='flex items-center justify-center flex-col'>
                        <label className="block text-sm font-medium text-gray-500 mb-2" >Confirm Password</label>

                        <input value={formval.confirm_password} onChange={handleFormval} type="password" name="confirm_password" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Confirm Password" />
                    </div>

                    <div>
                        <button type="submit" className="my-3  w-half py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-black hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                            Reset Password
                        </button>
                        <p className='text-primary hover:underline mb-3' onClick={() => dispatch(otpView(false))}>Change Reset Email</p>
                        <p onClick={() => { dispatch(otpView(false)); dispatch(resetPass(false)) }}>Go back to <span className='text-primary hover:underline'>login</span></p>



                    </div>

                </form></div> :
                <div className="max-w-xl mx-auto px-6 py-8 bg-white shadow-md rounded-md">
                    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Email For Password Reset</h1>
                    <form className="space-y-4 " onSubmit={handleResetEmail} >
                        <div className='flex items-center justify-center flex-col'>
                            <label className="block text-sm font-medium text-gray-500 mb-2" >An OTP will be sent to the provided mail</label>
                            <input value={email.email} type="email" name="email" onChange={handleEmail} className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Email" />
                        </div>

                        <div>
                            <button type="submit" className="my-3  w-half py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-black hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                Send OTP
                            </button>
                            <div></div> <p onClick={() => { dispatch(otpView(false)); dispatch(resetPass(false)) }}>Go back to <span className='text-primary hover:underline'>login</span></p>
                        </div>

                    </form></div>}

        </>
    )
}

export default SendEmail
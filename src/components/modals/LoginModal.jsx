import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../Button';
import Input from '../Input';
import api from '../../services/api';

const LoginModal = ({ isOpen, onClose, setUser, onOpenRegistration }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [apiError, setApiError] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = formData.password.length >= 3;
    const isFormValid = isEmailValid && isPasswordValid;

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!isFormValid) return;
        try {
            const response = await api.post('/login', formData);
            
            if (response.data?.data) {
                const { user, token } = response.data.data;
                localStorage.setItem('token', token);
                if (setUser) setUser(user);
            }
            
            onClose(); 
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                setApiError('Invalid credentials.');
            } else if (err.response?.data?.message) {
                setApiError(err.response.data.message);
            } else {
                setApiError('An error occurred during login. Please try again.');
            }
        }
    };

    

    return (
        <Modal
            isOpen={isOpen}
            quit={true}
            onQuit={onClose}
        >
            <div className='gap-6 flex flex-col items-center w-full'>
                {/* Heading */}
                <div className='gap-1.5 text-start flex flex-col items-center'>
                    <h2 className='type-heading-2 text-greyscale-950 text-center'>
                        Welcome Back
                    </h2>
                    <p className='type-body-xs text-greyscale-500 text-center'>
                        Log in to continue your learning
                    </p>
                </div>

                {/* Main Content */}
                <form onSubmit={handleSubmit} className='gap-5 w-full flex flex-col items-center'>
                    <Input
                        label="Email*"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (apiError) setApiError('');
                        }}
                        error={formData.email.length > 0 && !isEmailValid}
                        helperText={formData.email.length > 0 && !isEmailValid ? 'Invalid email format' : ''}
                    />
                    
                    <div className='flex flex-col w-full'>
                        <Input
                            label="Password*"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => {
                                setFormData({ ...formData, password: e.target.value });
                                if (apiError) setApiError('');
                            }}
                            error={formData.password.length > 0 && !isPasswordValid}
                            helperText={formData.password.length > 0 && !isPasswordValid ? 'Password must be at least 3 characters' : ''}
                        />
                        {apiError && <p className="text-helper-error type-body-xs mt-2">{apiError}</p>}
                    </div>

                    {/* Button */}
                    <Button 
                        type="submit"
                        text='s' 
                        height='12' 
                        variant="primary" 
                        fullWidth={true} 
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                    >
                        Log In
                    </Button>
                </form>

                {/* Or sign up */}
                <div className='gap-3 flex flex-col items-center'>
                    <div className='relative px-5 items-center w-full text-center'>
                        <hr className="border w-full border-greyscale-100" />
                        <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 type-body-xs text-greyscale-400 bg-greyscale-50 px-2'>or</span>
                    </div>
                    
                    <span className='type-micro-helper-regular-s text-greyscale-500'>
                        Don't have an account?
                        <button 
                            onClick={() => {
                                onClose();
                                onOpenRegistration();
                            }} 
                            className="pl-2 type-underlined-s text-greyscale-900 focus:outline-none"
                        >
                            Sign Up
                        </button>
                    </span>
                </div>

            </div>

        </Modal>
    );
};

export default LoginModal;
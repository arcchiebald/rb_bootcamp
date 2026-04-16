import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../Button';
import Input from '../Input';
import DragDropUpload from '../DragDropUpload';
import api from '../../services/api';

const RegistrationModal = ({ isOpen, onClose, setUser, onOpenLogin }) => {
    const [currentStage, setCurrentStage] = useState(1);
    const totalStages = 3;
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        username: '',
        avatar: null,
    });
    const [apiErrors, setApiErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = formData.password.length >= 3;
    const isPasswordConfirmValid = isPasswordValid && formData.password === formData.password_confirmation;
    const isUsernameValid = formData.username.length >= 3; 

    const handleNext = (e) => {
        if (e) e.preventDefault();
        if (currentStage === 1 && !isEmailValid) return;
        if (currentStage === 2 && !isPasswordConfirmValid) return;
        
        if (currentStage < totalStages) {
            setCurrentStage(prev => prev + 1);
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!isUsernameValid) return;
        const dataToSend = new FormData();
        dataToSend.append('email', formData.email);
        dataToSend.append('password', formData.password);
        dataToSend.append('password_confirmation', formData.password_confirmation);
        dataToSend.append('username', formData.username);

        if (formData.avatar) {
            dataToSend.append('avatar', formData.avatar);
        }

        try {
            const response = await api.post('/register', dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data?.data) {
                const { user, token } = response.data.data;
                localStorage.setItem('token', token);
                if (setUser) setUser(user);
            }

            onClose();
        } catch (err) {
            console.error(err);
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                setApiErrors(errors);

                if (errors.email) {
                    setCurrentStage(1);
                } else if (errors.password || errors.password_confirmation) {
                    setCurrentStage(2);
                } else if (errors.username || errors.avatar) {
                    setCurrentStage(3);
                }
            }
        }
    };

    const handleBack = () => {
        if (currentStage > 1) {
            setCurrentStage(prev => prev - 1);
        }
    };

    

    return (
        <Modal
            isOpen={isOpen}
            quit={true}
            onQuit={onClose}
            back={currentStage > 1}
            onBack={handleBack}
            stages={{ current: currentStage, total: totalStages }}
        >
            <div className='gap-6 flex flex-col items-center w-full'>
                {/* Heading */}
                <div
                    className='gap-1.5 text-start flex flex-col items-center'
                >
                    <h2 className='type-heading-2 text-greyscale-950 text-center'>
                        Create Account
                    </h2>
                    <p className='type-body-xs text-greyscale-500 text-center'>
                        Join and start learning today
                    </p>

                    {/* Stages Indicator */}
                    <div className="flex flex-row items-start p-0 gap-2 w-90 h-2 mt-6">
                        {Array.from({ length: totalStages }, (_, i) => i + 1).map((stage) => {
                            let bgColor = 'bg-purple-50'

                            if (stage < currentStage) bgColor = 'bg-purple-500'
                            else if (stage === currentStage) bgColor = 'bg-purple-200'

                            return (
                                <div
                                    key={stage}
                                    className={`flex-[1_0_0] h-full rounded-[30px] transition-colors duration-300 ${bgColor}`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <form
                    onSubmit={currentStage === totalStages ? handleSubmit : handleNext}
                    className='gap-5 w-full flex flex-col items-center'
                >
                    {currentStage === 1 && (
                        <>
                            <Input
                                label="Email*"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                    if (apiErrors.email) setApiErrors({ ...apiErrors, email: undefined });
                                }}
                                error={!!apiErrors.email || (formData.email.length > 0 && !isEmailValid)}
                                helperText={apiErrors.email ? apiErrors.email[0] : (formData.email.length > 0 && !isEmailValid) ? 'Invalid email format' : ''}
                            />
                        </>
                    )}
                    {currentStage === 2 && (
                        <>
                            <Input
                                label="Password*"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value });
                                    if (apiErrors.password) setApiErrors({ ...apiErrors, password: undefined });
                                }}
                                error={!!apiErrors.password || (formData.password.length > 0 && !isPasswordValid)}
                                helperText={apiErrors.password ? apiErrors.password[0] : (formData.password.length > 0 && !isPasswordValid) ? 'Password must be at least 3 characters' : ''}
                            />
                            <Input
                                label="Confirm Password*"
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.password_confirmation}
                                onChange={(e) => {
                                    setFormData({ ...formData, password_confirmation: e.target.value });
                                    if (apiErrors.password_confirmation) setApiErrors({ ...apiErrors, password_confirmation: undefined });
                                }}
                                error={!!apiErrors.password_confirmation || (formData.password_confirmation.length > 0 && (!isPasswordValid || formData.password_confirmation !== formData.password))}
                                helperText={apiErrors.password_confirmation ? apiErrors.password_confirmation[0] : (formData.password_confirmation.length > 0 && formData.password_confirmation !== formData.password) ? 'Passwords do not match' : ''}
                            />
                        </>

                    )}
                    {currentStage === 3 && (
                        <>
                            <Input
                                label="Username*"
                                placeholder="Choose a username"
                                value={formData.username}
                                onChange={(e) => {
                                    setFormData({ ...formData, username: e.target.value });
                                    if (apiErrors.username) setApiErrors({ ...apiErrors, username: undefined });
                                }}
                                error={!!apiErrors.username}
                                helperText={apiErrors.username ? apiErrors.username[0] : ''}
                            />
                            <DragDropUpload
                                label="Upload Avatar"
                                value={formData.avatar}
                                onChange={(file) => {
                                    setFormData({ ...formData, avatar: file });
                                    if (apiErrors.avatar) setApiErrors({ ...apiErrors, avatar: undefined });
                                }}
                            /* You can also add error styling mapping inside DragDropUpload if needed */
                            />
                            {apiErrors.avatar && <p className="text-helper-error type-body-xs">{apiErrors.avatar[0]}</p>}
                        </>
                    )}

                    {/* Button */}
                    <Button
                        type="submit"
                        text='s'
                        height='12'
                        variant="primary"
                        fullWidth={true}
                        onClick={currentStage === totalStages ? handleSubmit : handleNext}
                        disabled={
                            (currentStage === 1 && !isEmailValid) ||
                            (currentStage === 2 && !isPasswordConfirmValid) ||
                            (currentStage === 3 && !isUsernameValid)
                        }
                    >
                        {currentStage === totalStages ? 'Sign Up' : 'Next'}
                    </Button>
                </form>

                {/* Or login */}
                <div
                    className='gap-3 flex flex-col items-center w-full'
                >
                    <div className='relative px-5 items-center w-full text-center'>
                        <hr className="border w-full border-greyscale-100" />
                        <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 type-body-xs text-greyscale-400 bg-greyscale-50 px-2'>or</span>
                    </div>

                    <span className='type-micro-helper-regular-s text-greyscale-500'>
                        Already have an account?
                        <button 
                            onClick={onOpenLogin}
                            className="pl-2 type-underlined-s text-greyscale-900 focus:outline-none hover:cursor-pointer"
                        >
                            Log In
                        </button>
                    </span>
                </div>

            </div>

        </Modal>
    );
};

export default RegistrationModal;
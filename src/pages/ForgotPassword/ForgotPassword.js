import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordForm from '../../components/Auth/ForgotPasswordForm';
import { ToastContainer } from 'react-toastify';
import './ForgotPassword.css'

const ForgotPassword = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const handleStepChange = (step) => {
        if (step === 'login') {
            navigate('/login');
        } else {
            setCurrentStep(step);
        }
    };

    return (
        <div className="forgot-password-page">
            <ToastContainer />
            <ForgotPasswordForm currentStep={currentStep} onStepChange={handleStepChange} />
        </div>
    );
};

export default ForgotPassword;

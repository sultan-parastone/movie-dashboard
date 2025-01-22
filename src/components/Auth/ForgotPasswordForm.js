import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPasswordForm.css'

const ForgotPasswordForm = ({ onStepChange, currentStep }) => {
    
    const navigate = useNavigate();

    // Forgot Password Fields Validation schema
    const validationSchemas = [
        Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        Yup.object({
            code: Yup.string()
                .matches(/^\d{6}$/, 'Code must be a 6-digit numeric value')
                .required('Code is required'),
        }),
        Yup.object({
            newPassword: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('New password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
    ];

    // Handle form submission for each step
    const handleStepSubmit = (values) => {
        if (currentStep === 1) {
            toast.success('Verification email sent!', { position: 'top-right' });
            onStepChange(2);
        } else if (currentStep === 2) {
            if (values.code === '123456') {
                toast.success('Code verified successfully!', { position: 'top-right' });
                onStepChange(3);
            } else {
                toast.error('Invalid code!', { position: 'top-center' });
            }
        } else if (currentStep === 3) {
            toast.success('Password reset successfully!', { position: 'top-right' });
            setTimeout(() => navigate('/login'), 2000); 
        }
    };

    return (

        <div className='forgot-password-form-container d-flex flex-column align-items-center justify-content-center vh-100 p-3'>
            <Formik
                initialValues={{ email: '', code: '', newPassword: '', confirmPassword: '' }}
                validationSchema={validationSchemas[currentStep - 1]}
                onSubmit={handleStepSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="forgot-passord-form w-100" style={{ maxWidth: '450px' }}>
                    <h3 className="login-title">Forgot Password ?</h3>
                        {currentStep === 1 && (
                            <BootstrapForm.Group className="mb-3" controlId="formEmail">
                                <BootstrapForm.Label className='brand-label'>Email Address</BootstrapForm.Label>
                                <Field
                                    name="email"
                                    type="email"
                                    as={BootstrapForm.Control}
                                    className="brand-input"
                                    isInvalid={!!errors.email && touched.email}
                                />
                                {errors.email && touched.email && (
                                    <div className="text-danger">{errors.email}</div>
                                )}
                            </BootstrapForm.Group>
                        )}

                        {currentStep === 2 && (
                            <BootstrapForm.Group className="mb-3" controlId="formCode">
                                <BootstrapForm.Label className='brand-label'>6-Digit Verification Code</BootstrapForm.Label>
                                <Field
                                    name="code"
                                    type="text"
                                    as={BootstrapForm.Control}
                                    className="brand-input"
                                    isInvalid={!!errors.code && touched.code}
                                />
                                {errors.code && touched.code && (
                                    <div className="text-danger">{errors.code}</div>
                                )}
                            </BootstrapForm.Group>
                        )}

                        {currentStep === 3 && (
                            <>
                                <BootstrapForm.Group className="mb-3" controlId="formNewPassword">
                                    <BootstrapForm.Label className='brand-label'>New Password</BootstrapForm.Label>
                                    <Field
                                        name="newPassword"
                                        type="password"
                                        as={BootstrapForm.Control}
                                        className="brand-input"
                                        isInvalid={!!errors.newPassword && touched.newPassword}
                                    />
                                    {errors.newPassword && touched.newPassword && (
                                        <div className="text-danger">{errors.newPassword}</div>
                                    )}
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="formConfirmPassword">
                                    <BootstrapForm.Label className='brand-label'>Confirm Password</BootstrapForm.Label>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        as={BootstrapForm.Control}
                                        className="brand-input"
                                        isInvalid={!!errors.confirmPassword && touched.confirmPassword}
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <div className="text-danger">{errors.confirmPassword}</div>
                                    )}
                                </BootstrapForm.Group>
                            </>
                        )}

                        <Button variant="primary" className="brand-red-btn w-100" type="submit" >
                            {currentStep === 3 ? 'Reset Password' : 'Next'}
                        </Button>

                        
                        <div className="forg-link text-center mt-3">
                            <Link to="/" className="forgot-password-link">Go Back to Login Page!</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>

    );
};

export default ForgotPasswordForm;
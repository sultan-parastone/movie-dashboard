import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Logo from '../../assets/images/logo.png'
import './LoginForm.css';

const LoginForm = () => {
    const navigate = useNavigate();

    // Validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleLogin = (values) => {
        const { email, password } = values;

        // Hardcoded authentication logic
        if (email === 'admin@admin.com' && password === 'Admin@123$') {
            localStorage.setItem('isAuthenticated', 'true');
            toast.success('Logged in successfully!', { position: 'top-right' }); 
            setTimeout(() => navigate('/dashboard'), 2000);
        } else {
            toast.error('Invalid email address or password!', { position: 'top-right' });
        }
    };

    return (
        <div className="login-form-container d-flex flex-column align-items-center justify-content-center vh-100 p-3">
            <ToastContainer />
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ errors, touched }) => (
                    <Form className="login-form w-100" style={{ maxWidth: '450px' }}>

                        <img className='reg-logo' src={Logo}/>

                        <h3 className="login-title">Log In</h3>

                        {/* Email Field */}
                        <BootstrapForm.Group className="mb-3" controlId="formEmail">
                            <BootstrapForm.Label className="brand-label">Email Address</BootstrapForm.Label>
                            <Field
                                name="email"
                                type="email"
                                className="brand-input"
                                as={BootstrapForm.Control}
                                isInvalid={!!errors.email && touched.email}
                            />
                            <BootstrapForm.Control.Feedback type="invalid">
                                {errors.email}
                            </BootstrapForm.Control.Feedback>
                        </BootstrapForm.Group>

                        {/* Password Field */}
                        <BootstrapForm.Group className="mb-3" controlId="formPassword">
                            <BootstrapForm.Label className="brand-label">Password</BootstrapForm.Label>
                            <Field
                                name="password"
                                type="password"
                                className="brand-input"
                                as={BootstrapForm.Control}
                                isInvalid={!!errors.password && touched.password}
                            />
                            <BootstrapForm.Control.Feedback type="invalid">
                                {errors.password}
                            </BootstrapForm.Control.Feedback>
                        </BootstrapForm.Group>

                        {/* Submit Button */}
                        <Button variant="primary" className="brand-red-btn w-100" type="submit">
                            Sign In
                        </Button>

                        {/* Forgot Password Link */}
                        <div className="forg-link text-center mt-3">
                            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;

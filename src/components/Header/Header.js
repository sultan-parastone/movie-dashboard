import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Menu, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/images/logo.png'

const Header = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    return (
        <Navbar expand="lg" className="shadow-sm dash-header">
            <Container fluid>
                <Button
                    variant="link"
                    className="text-light d-flex align-items-center"
                    onClick={toggleSidebar}
                >
                    <Menu size={24} />
                </Button>
                <Navbar.Brand className="ms-3">
                    <Link to="/dashboard" >
                        <img
                            src={Logo}
                            alt="Movilytics Logo"
                            height="30"
                        />
                    </Link>

                </Navbar.Brand>
                <Button
                    variant="link"
                    className="text-light ms-auto d-flex align-items-center"
                    onClick={handleLogout}
                >
                    <LogOut size={24} />
                </Button>
            </Container>
        </Navbar>
    );
};

export default Header;

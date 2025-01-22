import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Gauge } from 'lucide-react';
import Logo from '../../assets/images/logo.png';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ show, handleClose }) => {
    return (
        <Offcanvas show={show} onHide={handleClose} placement="start" className="brand-offcanvas">
            <Offcanvas.Header closeButton>
                <div className='offcanvas-logo'>
                    <img src={Logo} alt="Logo" />
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul className="dash-menu">
                    <li className="dash-list active">
                        <Link to="/dashboard" onClick={handleClose} className="d-flex align-items-center">
                            <Gauge className='me-2' />
                            <p>Dashboard</p>
                        </Link>
                    </li>
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Sidebar;

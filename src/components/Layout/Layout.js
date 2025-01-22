import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({ children }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
    const closeSidebar = () => setSidebarVisible(false);

    return (
        <>
            {/* Header Component */}
            <Header toggleSidebar={toggleSidebar} />

            {/* Sidebar Component */}
            <Sidebar show={sidebarVisible} handleClose={closeSidebar} />

            {/* Page Content */}
            <div className="main-content">{children}</div>
        </>
    );
};

export default Layout;

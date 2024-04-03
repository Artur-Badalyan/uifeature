import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { cx } from 'utils/all.js'

import Header from 'components/header/index.jsx';
import Footer from 'components/footer/index.jsx';
import Sidebar from 'components/sidebar/index.jsx';

const Layout = ({ children }) => {
    const location = useLocation();
    const viewSidebar = location.pathname.includes('components')
    console.log('location ',location)
    return (
        <div>
            <Header />
            <div className='flex gap-6'>
                {viewSidebar && <Sidebar />}
                <div className={cx('mt-20',viewSidebar ? 'w-[calc(100%-320px)]' : 'w-full')}>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
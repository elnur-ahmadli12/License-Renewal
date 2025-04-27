import React from 'react';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <PublicHeader />
            <Outlet />
        </div>
    );
}
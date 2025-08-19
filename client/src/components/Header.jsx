import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Space, Divider, theme, Modal } from 'antd';
const { useToken } = theme;
import { UserOutlined, StarFilled } from '@ant-design/icons';

import { UserAuth } from '../context/AuthContext';

const Header = () => {
    const { session, user, logout } = UserAuth();
    const items = [
        {
            key: '1',
            label: (
                <a rel="noopener noreferrer" href="/profile">
                    Profile
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a rel="noopener noreferrer" href="/settings">
                    Settings
                </a>
            ),

        },

    ];
    const { token } = useToken();
    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const menuStyle = {
        boxShadow: 'none',
    };

    const handleLogout = () => {
        Modal.confirm({
            title: 'Xác nhận đăng xuất',
            content: 'Bạn có chắc chắn muốn đăng xuất không?',
            okText: 'Đăng xuất',
            cancelText: 'Hủy',
            onOk: logout,
        });
    };

    const location = useLocation();
    const navs = [
        { label: 'Home', path: '/home' },
        { label: 'Courses', path: '/courses' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
    ];

    return (
        <header className="bg-white backdrop-opacity-25 backdrop-filter backdrop-blur-2xl  shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <span className="ml-3 text-xl font-bold text-gray-800">Kien English</span>
                </div>
                <nav className="hidden md:flex space-x-8">
                    {navs.map(nav => (
                        <a
                            key={nav.path}
                            href={nav.path}
                            className={
                                location.pathname.startsWith(nav.path)
                                    ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-1'
                                    : 'text-gray-600 hover:text-blue-600'
                            }
                        >
                            {nav.label}
                        </a>
                    ))}
                </nav>
                {session && user ? (
                    <Dropdown
                        menu={{ items }}
                        popupRender={menu => (
                            <div style={contentStyle}>
                                {React.cloneElement(menu, { style: menuStyle })}
                                <Divider style={{ margin: 0 }} />
                                <Space style={{ padding: 10 }}>
                                    <Button type="primary" onClick={handleLogout}>Log out!</Button>
                                </Space>
                            </div>
                        )}
                    >
                        <a onClick={e => e.preventDefault()}>
                            <Space>
                                <img src={user.image_url || 'https://via.placeholder.com/40'} alt="Avatar" className="rounded-full w-10 h-10" />
                                {user.full_name || ''}
                                <StarFilled />
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                ) : (
                    <div>
                        <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full' onClick={() => window.location.href = '/login'}>Đăng nhập</button>
                        <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full' onClick={() => window.location.href = '/register'}>Đăng ký</button>
                    </div>
                )}

            </div>
        </header>
    )
}

export default Header
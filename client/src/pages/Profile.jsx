import React from 'react';
import { Tabs } from 'antd';
import { motion } from 'framer-motion';

import { Avatar } from 'antd';
import AccountTab from '../components/profile/AccountTab';
import UpdateInfoTab from '../components/profile/UpdateInfoTab';

import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

const tabItems = [
    {
        key: 'account',
        label: 'Account',
        children: <AccountTab />,
    },
    {
        key: 'update',
        label: 'Update Info',
        children: <UpdateInfoTab />,
    },
];




const Profile = () => {
    const [activeTab, setActiveTab] = useState('account');
    // const { user } = UserAuth();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    // console.log(user);
    console.log(user);
    return (
        <motion.div
            className="flex flex-col items-center min-h-[70vh] py-10 px-2 bg-gradient-to-br from-blue-50 to-indigo-100"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >
            <motion.h1
                className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 w-full max-w-5xl text-left"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                Profile
            </motion.h1>
            <motion.div
                className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-0 flex flex-col md:flex-row min-h-[400px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
            >
                {/* Sidebar */}
                <div className="md:w-1/4 w-full border-r border-gray-200 bg-gray-50 rounded-l-xl flex-shrink-0 flex flex-col items-center py-8 px-2">
                    <Avatar size={96} src={user.image_url || 'https://via.placeholder.com/40'} className="mb-4 shadow-lg" />
                    <h2 className="text-xl font-bold mb-1 text-center">{user.full_name || 'NO NAME'}</h2>
                    <span className="text-gray-500 text-center mb-6 text-sm">{user.email}</span>
                    <nav className="w-full flex flex-col gap-2 mt-4">
                        {tabItems.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`w-full py-2 px-4 rounded-lg text-left transition font-medium text-base
                  ${activeTab === tab.key ? 'bg-blue-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
                {/* Content */}
                <div className="md:w-3/4 w-full p-6 flex items-center justify-center">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        {tabItems.find(tab => tab.key === activeTab)?.children}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Profile;
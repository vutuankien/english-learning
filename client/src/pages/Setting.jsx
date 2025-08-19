import React, { useState } from 'react';
import ChangePassword from '../components/settings/ChangePassword';
import ThemeSwitcher from '../components/settings/ThemeSwitcher';
import NotificationSettings from '../components/settings/NotificationSettings';
import DeleteAccount from '../components/settings/DeleteAccount';
import LanguageSetting from '../components/settings/LanguageSetting';

const tabItems = [
    { key: 'password', label: 'Change Password', children: <ChangePassword /> },
    { key: 'theme', label: 'Theme', children: <ThemeSwitcher /> },
    { key: 'notification', label: 'Notifications', children: <NotificationSettings /> },
    { key: 'language', label: 'Language', children: <LanguageSetting /> },
    { key: 'delete', label: 'Delete Account', children: <DeleteAccount /> },
];

const Setting = () => {
    const [activeKey, setActiveKey] = useState('password');
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center py-10">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
                {/* Sidebar */}
                <div className="md:w-1/4 w-full bg-blue-50 border-r border-blue-200 flex flex-col items-center py-10 px-2">
                    <div className="mb-8 text-2xl font-bold text-blue-700 tracking-wide">Settings</div>
                    <nav className="w-full flex flex-col gap-2">
                        {tabItems.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveKey(tab.key)}
                                className={`w-full py-3 px-4 rounded-lg text-left transition font-medium text-base
                  ${activeKey === tab.key ? 'bg-blue-600 text-white shadow' : 'bg-white text-blue-700 hover:bg-blue-100'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
                {/* Content */}
                <div className="md:w-3/4 w-full p-8 flex items-center justify-center bg-white">
                    <div className="w-full max-w-xl">
                        {tabItems.find(tab => tab.key === activeKey)?.children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;
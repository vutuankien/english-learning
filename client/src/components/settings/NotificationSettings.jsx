import React, { useState } from 'react';
import { Switch } from 'antd';

const NotificationSettings = () => {
    const [email, setEmail] = useState(true);
    const [sms, setSms] = useState(false);
    return (
        <div className="max-w-md mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <Switch checked={email} onChange={setEmail} className="bg-blue-500" />
            </div>
            <div className="flex items-center justify-between">
                <span>SMS Notifications</span>
                <Switch checked={sms} onChange={setSms} className="bg-blue-500" />
            </div>
        </div>
    );
};

export default NotificationSettings;

import React, { useState } from 'react';
import { Input, Button, message } from 'antd';

const ChangePassword = () => {
    const [form, setForm] = useState({ old: '', new: '', confirm: '' });
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = () => {
        if (!form.old || !form.new || !form.confirm) return message.error('Please fill all fields!');
        if (form.new !== form.confirm) return message.error('Passwords do not match!');
        message.success('Password changed!');
    };
    return (
        <div className="max-w-md mx-auto space-y-4">
            <Input.Password name="old" placeholder="Old Password" value={form.old} onChange={handleChange} />
            <Input.Password name="new" placeholder="New Password" value={form.new} onChange={handleChange} />
            <Input.Password name="confirm" placeholder="Confirm New Password" value={form.confirm} onChange={handleChange} />
            <Button type="primary" className="bg-blue-600 w-full" onClick={handleSubmit}>Change Password</Button>
        </div>
    );
};

export default ChangePassword;

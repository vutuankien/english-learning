import React from 'react';
import { Card, Descriptions, Avatar } from 'antd';
import { UserAuth } from '../../context/AuthContext';

const AccountTab = () => {

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    console.log(user);

    // const { user } = UserAuth(); 
    let joined = user.created_at;
    if (joined) {
        const d = new Date(joined);
        joined = d.toLocaleDateString('en-GB').slice(0, 10);
    } else {
        joined = 'NO DATE';
    }

    return (
        <Card className="shadow-lg">
            <div className="flex flex-col items-center mb-6">
                <img src={user.image_url || 'https://via.placeholder.com/40'} alt="User Avatar" className="mb-4 rounded-full w-24 h-24 shadow-lg" />
                <h2 className="text-2xl font-bold mb-1">{user.full_name || 'NO NAME'}</h2>
                <span className="text-gray-500">{user.email}</span>
            </div>
            <Descriptions column={1} bordered size="middle">
                <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{user.phone || 'NO PHONE'}</Descriptions.Item>
                <Descriptions.Item label="Level">{user.level || 'NO LEVEL'}</Descriptions.Item>
                <Descriptions.Item label="Grade">{user.grade || 'NO GRADE'}</Descriptions.Item>
                <Descriptions.Item label="Joined">{joined}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default AccountTab;

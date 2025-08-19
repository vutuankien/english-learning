import React from 'react';
import { Button, Modal, message } from 'antd';

const DeleteAccount = () => {
    const handleDelete = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete your account?',
            content: 'This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => message.success('Account deleted!'),
        });
    };
    return (
        <div className="max-w-md mx-auto flex flex-col gap-4">
            <Button danger className="w-full" onClick={handleDelete}>Delete Account</Button>
        </div>
    );
};

export default DeleteAccount;

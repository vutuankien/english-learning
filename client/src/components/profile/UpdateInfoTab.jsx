import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Select, Upload } from 'antd';
import axios from 'axios';
import { UserAuth } from '../../context/AuthContext';


const options = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Grade ${i + 1}`,
}));

const handleChange = value => {
    console.log(`Selected: ${value}`);
};

const UpdateInfoTab = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const { api } = UserAuth();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    console.log(user?.id);
    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.full_name || '',
                phone: user.phone || '',
                grade: user.grade ? user.grade.toString() : '',
                image: user.image_url ? [{ url: user.image_url }] : [], // Set image if available
            });
        }
    }, [user, form]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('full_name', values.name || '');
            formData.append('phone', values.phone || '');
            formData.append('grade', values.grade || '');

            if (values.image && values.image[0] && values.image[0].originFileObj) {
                const file = values.image[0].originFileObj;
                const fileExt = file.name.split('.').pop().toLowerCase();
                const allowedExts = ['jpg', 'jpeg', 'png'];
                if (!allowedExts.includes(fileExt)) {
                    message.error('Only JPG, JPEG, or PNG files are allowed!');
                    setLoading(false);
                    return;
                }
                formData.append('avatar', file);
            }

            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                message.error('Authentication token is missing! Please log in again.');
                setLoading(false);
                return;
            }

            const res = await axios.put(`${api}/user/update/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`, // Đảm bảo token được gửi
                },
            });

            if (res.data.success && res.data.data.length > 0) {
                message.success('Information updated!');
                localStorage.setItem('user', JSON.stringify(res.data.data[0]));
            } else {
                message.warning('Information updated, but no data returned. Please refresh.');
            }
            console.log('Updated user:', res.data);
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || 'Update failed due to an unknown error';
            console.error('Error:', err.response ? err.response.data : err.message);
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-lg">
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="max-w-xl mx-auto"
                initialValues={{
                    name: '',
                    email: '',
                }}
            >
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Grade" name="grade" rules={[{ required: true, message: 'Please input your grade!' }]}>
                    <Select
                        size="large"
                        placeholder="Select your grade"
                        onChange={handleChange}
                        style={{ width: 200 }}
                        options={options}
                    />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                    rules={[{ required: true, message: 'Please upload your image!' }]}
                >
                    <Upload
                        name="image"
                        listType="picture-card"
                        maxCount={1}
                        beforeUpload={() => false} // prevent auto upload
                    >
                        <div>
                            <span className="text-blue-600">Upload</span>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="bg-blue-600" loading={loading}>Update</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default UpdateInfoTab;

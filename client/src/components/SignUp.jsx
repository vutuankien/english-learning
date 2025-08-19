import React from 'react';
import { Divider, Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'; // Adjust path to AuthContext.jsx

const SignUp = () => {
    const [form] = Form.useForm();
    const { SignInNewUser, loading, error } = UserAuth();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            await SignInNewUser(values.email, values.password, values.confirmPassword);
            message.success('Sign up successful!');
            navigate('/login');
        } catch (err) {
            message.error(error || 'Sign up failed');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Form Failed:', errorInfo);
    };

    const formContainerStyle = {
        maxWidth: 600,
        width: '100%',
        padding: '2rem',
        borderRadius: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    };

    return (
        <div className="w-full flex justify-center items-center min-h-[calc(100vh-64px)] p-4 bg-gray-800">
            <div style={formContainerStyle}>
                <h2 className="text-5xl font-bold mb-6 text-white">Sign Up</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label={<span className="text-white text-2xl font-bold">Email</span>}
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input placeholder="Enter your Email" className="w-full px-2 py-1" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-white text-2xl font-bold">Password</span>}
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter your password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' },
                        ]}
                    >
                        <Input.Password placeholder="Enter your Password" className="w-full px-2 py-1" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="text-white text-2xl font-bold">Confirm Password</span>}
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm your Password" className="w-full px-2 py-1" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                            loading={loading}
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <Divider
                    style={{
                        borderColor: '#1890ff',
                        margin: '20px 0',
                    }}
                >
                    <span className="text-gray-400">or</span>
                </Divider>
                <div className="text-center text-white text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:text-blue-700">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
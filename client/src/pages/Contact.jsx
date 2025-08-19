import React, { useState } from 'react';
import { Button, Form, Input, message, Space, Typography, Card } from 'antd';
import { motion } from 'framer-motion';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const Contact = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            message.success('Your message has been sent successfully!');
            form.resetFields();
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 mt-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-5xl mx-auto"
            >
                <Title level={1} className="text-center text-4xl font-bold text-gray-800 mb-8">
                    Contact Us
                </Title>
                <Paragraph className="text-lg text-gray-600 text-center mb-12">
                    Have questions or need help with your English learning journey? Reach out to us, and our team will get back to you as soon as possible!
                </Paragraph>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card
                            className="shadow-lg border-none bg-white rounded-xl"
                            title={<Title level={3}>Send Us a Message</Title>}
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                className="space-y-4"
                            >
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true, message: 'Please enter your name' }]}
                                >
                                    <Input placeholder="Your name" size="large" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Please enter your email' },
                                        { type: 'email', message: 'Please enter a valid email' },
                                    ]}
                                >
                                    <Input placeholder="Your email" size="large" />
                                </Form.Item>
                                <Form.Item
                                    name="message"
                                    label="Message"
                                    rules={[{ required: true, message: 'Please enter your message' }]}
                                >
                                    <TextArea placeholder="Your message" rows={4} />
                                </Form.Item>
                                <Form.Item>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            className="bg-blue-500 hover:bg-blue-600 rounded-full px-8"
                                            size="large"
                                        >
                                            Send Message
                                        </Button>
                                    </motion.div>
                                </Form.Item>
                            </Form>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Card className="shadow-lg border-none bg-white rounded-xl">
                            <Title level={3}>Get in Touch</Title>
                            <Space direction="vertical" size="large" className="w-full">
                                <div className="flex items-start">
                                    <MailOutlined className="text-2xl text-blue-500 mr-4" />
                                    <div>
                                        <Paragraph className="text-gray-600 mb-0">Email</Paragraph>
                                        <Paragraph className="text-gray-800 font-semibold">
                                            support@englishlearn.com
                                        </Paragraph>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <PhoneOutlined className="text-2xl text-blue-500 mr-4" />
                                    <div>
                                        <Paragraph className="text-gray-600 mb-0">Phone</Paragraph>
                                        <Paragraph className="text-gray-800 font-semibold">
                                            +1 (555) 123-4567
                                        </Paragraph>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <EnvironmentOutlined className="text-2xl text-blue-500 mr-4" />
                                    <div>
                                        <Paragraph className="text-gray-600 mb-0">Address</Paragraph>
                                        <Paragraph className="text-gray-800 font-semibold">
                                            123 Language Lane, Education City, USA
                                        </Paragraph>
                                    </div>
                                </div>
                            </Space>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default Contact
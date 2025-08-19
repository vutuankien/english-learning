import React from 'react';
import { Button, Card, Space, Typography } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOutlined, TeamOutlined, GlobalOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const About = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <BookOutlined className="text-4xl text-blue-500" />,
            title: 'Interactive Lessons',
            description: 'Engaging, tailored lessons to improve your English skills at your own pace.',
        },
        {
            icon: <TeamOutlined className="text-4xl text-blue-500" />,
            title: 'Community Support',
            description: 'Connect with fellow learners and expert educators for guidance.',
        },
        {
            icon: <GlobalOutlined className="text-4xl text-blue-500" />,
            title: 'Global Access',
            description: 'Learn English from anywhere, anytime, with our online platform.',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 mt-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-5xl mx-auto"
            >
                <Title level={1} className="text-center text-4xl font-bold text-gray-800 mb-8">
                    About Us
                </Title>
                <Paragraph className="text-lg text-gray-600 text-center mb-12">
                    We are passionate English educators dedicated to helping students worldwide master the English language. Our platform is designed to make learning English fun, accessible, and effective for students of all levels.
                </Paragraph>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <Card
                                hoverable
                                className="text-center shadow-lg border-none bg-white rounded-xl"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <Title level={4} className="text-gray-800">{feature.title}</Title>
                                <Paragraph className="text-gray-600">{feature.description}</Paragraph>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mb-12">
                    <Title level={3} className="text-2xl font-semibold text-gray-800 mb-4">
                        Our Mission
                    </Title>
                    <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our mission is to empower students to communicate confidently in English. Through innovative teaching methods, interactive content, and a supportive community, we strive to make English learning a rewarding journey.
                    </Paragraph>
                </div>

                <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => navigate('/courses')}
                        className="bg-blue-500 hover:bg-blue-600 rounded-full px-8"
                    >
                        Explore Our Courses
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default About;
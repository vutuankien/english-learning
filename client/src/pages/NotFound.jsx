import React, { useState } from 'react';
import { Button, Input, Result, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchOutlined } from '@ant-design/icons';

const NotFound = () => {
    const navigate = useNavigate();


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-lg w-full text-center"
            >
                <Result
                    status="404"
                    title={
                        <motion.h1
                            className="text-6xl font-bold text-gray-800"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            404
                        </motion.h1>
                    }
                    subTitle={
                        <div className="text-lg text-gray-600 mt-4">
                            <p>Oops! The page you're looking for has vanished.</p>
                            <p className="mt-2">Try reload or return to the homepage.</p>
                        </div>
                    }
                    extra={
                        <Space direction="vertical" size="large" className="w-full">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >

                            </motion.div>
                            <Space>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        type="primary"
                                        onClick={() => navigate('/')}
                                        className="bg-blue-500 hover:bg-blue-600 rounded-full px-6"
                                        size="large"
                                    >
                                        Back to Home
                                    </Button>
                                </motion.div>

                            </Space>
                        </Space>
                    }
                />
                <motion.div
                    className="mt-8 text-gray-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <p>Maybe this page is on a coffee break? ☕</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFound;
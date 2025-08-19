import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spin } from 'antd';
import { ArrowLeftOutlined, BookOutlined, BulbOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { UserAuth } from '../context/AuthContext';
import VocabSection from '../components/course/VocabSection';
import FlashCardUnitList from '../components/course/FlashCardUnitList';
import Speaking from '../components/Speaking/Speaking';
import Practice from '../components/Practice/PracticeSection';
const sidebarItems = [
    { key: 'vocab', label: 'Vocabulary', icon: <BookOutlined /> },
    { key: 'flashcard', label: 'Flash Cards', icon: <BulbOutlined /> },
    { key: 'practice', label: 'Practice Quiz', icon: <ThunderboltOutlined /> },
    { key: 'grammar', label: 'Grammar Tips', icon: <BookOutlined /> },
    { key: 'speaking', label: 'Speaking', icon: <BulbOutlined /> },
];

const CourseDetail = () => {
    const { id } = useParams();
    const { api } = UserAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('vocab');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`${api}/courses/${id}`);
                const data = await res.json();
                setCourse(data);
            } catch (err) {
                setCourse(null);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [api, id]);

    if (loading) return <div className="flex justify-center items-center min-h-screen"><Spin size="large" /></div>;
    if (!course) return <div className="text-center text-red-500 mt-10">Course not found!</div>;

    // Render content theo tab
    let content = null;
    if (activeTab === 'vocab') {
        content = <VocabSection courseId={id} />;
    }
    else if (activeTab === 'flashcard') {
        content = <FlashCardUnitList courseId={id} />;
    } else if (activeTab === 'speaking') {
        content = <Speaking courseId={id} />;
    }
    else if (activeTab === 'practice') {
        content = <Practice courseId={id} />;
    }
    else {
        content = (
            <Card className="max-w-2xl w-full rounded-2xl shadow-2xl p-6">
                <Button
                    type="link"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                    className="mb-4"
                >
                    Back
                </Button>
                <img src={course.image_url} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-6" />
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <div className="flex gap-4 mb-4">
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">Grade {course.grade}</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${course.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {course.is_active ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <div className="mb-4 text-gray-600">{course.description}</div>
                <div className="flex justify-between text-sm text-gray-500">
                    <span>By: <span className="font-medium text-blue-700">{course.created_by || 'Unknown'}</span></span>
                    <span>{course.created_at ? new Date(course.created_at).toLocaleDateString('en-GB') : ''}</span>
                </div>
            </Card>
        );
    }

    return (
        <motion.div
            className="min-h-screen flex bg-gradient-to-br from-blue-100 to-blue-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Sidebar */}
            <aside className="w-1/5 min-w-[200px] max-w-xs bg-white shadow-lg flex flex-col py-10  border-r border-blue-100">
                <div className="mb-10 text-xl font-bold text-blue-700 tracking-wide text-center">Course Tools</div>
                <nav className="flex flex-col gap-6">
                    {sidebarItems.map(item => (
                        <Button
                            key={item.key}
                            type="text"
                            className={`flex items-center gap-4 px-4 py-5 rounded-xl font-medium text-base transition-all duration-200
                                ${activeTab === item.key
                                    ? 'bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 shadow-lg'
                                    : 'text-blue-700 px-4 py-5 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-400 hover:text-blue-900 hover:shadow-lg'
                                }`}
                            icon={item.icon}
                            onClick={() => setActiveTab(item.key)}
                        >
                            {item.label}
                        </Button>
                    ))}
                </nav>
            </aside>
            {/* Main Content */}
            <main className="w-4/5">
                {content}
            </main>
        </motion.div>
    );
};

export default CourseDetail;
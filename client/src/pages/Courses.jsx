import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Card, Button, message } from 'antd';
import { UserAuth } from '../context/AuthContext';
import axios from 'axios';



const Courses = () => {
    const navigate = useNavigate();
    const { api, user } = UserAuth();
    const [courses, setCourses] = useState([]);
    const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);

    // Lấy danh sách courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${api}/courses`);
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, [api]);

    // Lấy danh sách courseId đã enroll
    useEffect(() => {
        const fetchEnrolled = async () => {
            if (!user?.id) return;
            try {
                const response = await fetch(`${api}/courses-enrollment/user/${user.id}`);
                const data = await response.json();
                // Giả sử backend trả về mảng các object có course_id
                setEnrolledCourseIds(data.map(item => item.course_id));
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            }
        };
        fetchEnrolled();
    }, [api, user]);

    // Hàm enroll giữ nguyên, sau khi enroll thành công thì cập nhật enrolledCourseIds
    const handleEnroll = async (courseId) => {
        try {
            const res = await axios.post(`${api}/courses-enrollment/enroll/${courseId}/${user.id}`);
            const data = res.data;
            if (res.status === 200) {
                message.success(data?.message || 'Enrolled successfully!');
                setEnrolledCourseIds(prev => [...prev, courseId]);
            } else {
                message.error(data?.error || 'Enroll failed!');
            }
        } catch (err) {
            if (err.response) {
                // Lỗi từ phía server, có response trả về
                const msg = err.response.data?.error || err.response.data?.message || 'Server error!';
                if (msg === 'User already enrolled in this course') {
                    message.warning('You have already enrolled in this course!');
                    setCourses(prev =>
                        prev.map(c =>
                            c.id === courseId ? { ...c, is_enrolled: true } : c
                        )
                    );
                } else {
                    message.error(msg);
                }
                console.error('Server error:', err.response);
            } else if (err.request) {
                // Không nhận được response từ server
                message.error('No response from server!');
                console.error('No response:', err.request);
            } else {
                // Lỗi khác
                message.error('Network error!');
                console.error('Error:', err.message);
            }
        }

    };
    useEffect(() => {
        // console.log("enrolledCourses: ", enrolledCourses);
        console.log("Courses:", courses);
    })

    return (
        <div className='min-h-screen bg-gray-50 '>
            <div className='max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8 '>
                <p className='text-gray-700 mb-8 text-3xl font-bold mt-15 block py-10'>Here you can find a list of courses</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {courses.map((course, idx) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                        >
                            <Card
                                hoverable

                                cover={
                                    <div className="relative">
                                        <img alt={course.title} src={course.image_url} className='h-48 w-full object-cover rounded-t-lg' />
                                        {course.is_active === false && (
                                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow">Inactive</span>
                                        )}
                                        {course.is_active === true && (
                                            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">Active</span>
                                        )}
                                    </div>
                                }
                                className='rounded-lg shadow-lg flex flex-col justify-between h-full border border-blue-100 hover:border-blue-400 transition'
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className='text-xl font-bold'>{course.title}</h2>
                                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold">Grade {course.grade}</span>
                                </div>
                                <p className='text-gray-600 mb-3 line-clamp-3'>{course.description}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                    <span>By: <span className="font-medium text-blue-700">{course.created_by || 'Unknown'}</span></span>
                                    <span>{course.created_at ? new Date(course.created_at).toLocaleDateString('en-GB') : ''}</span>
                                </div>
                                <Button
                                    type='primary'
                                    className='bg-blue-600 w-full'
                                    onClick={e => {
                                        e.stopPropagation();
                                        if (!enrolledCourseIds.includes(course.id)) handleEnroll(course.id);
                                        else navigate(`/courses/${course.id}`);
                                    }}
                                >
                                    {enrolledCourseIds.includes(course.id) ? 'Go to Course' : 'Enroll Now'}
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
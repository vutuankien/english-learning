import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card, Divider } from 'antd';
import content from '../assets/content.png';
import banner from "../assets/illustrations-removebg-preview.png"
import course1 from '../assets/illustration.png'
import course2 from '../assets/image.png'
import course3 from '../assets/illustration-3.png'
import woman from '../assets/pic.png'
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <motion.section
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
                    <motion.div
                        className="md:w-1/2 text-center md:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Effective English courses for kids and teenagers</h1>
                        <p className="text-lg mb-6">With professional teachers, flexible learning schedules and courses for all levels you will speak confidently in no time.</p>
                        <Button type="primary" size="large" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                            Start Learning
                        </Button>
                    </motion.div>
                    <motion.div
                        className="md:w-1/2 mt-8 md:mt-0"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <img src={banner} alt="Learning" className="w-full h-auto" />
                    </motion.div>
                </div>
            </motion.section>

            {/* Course Highlights */}
            <motion.section className="py-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        className="text-3xl font-bold text-center text-gray-800 mb-5"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Top-notch teachers, limitless learning opportunities
                    </motion.h2>
                    <motion.p
                        className="text-lg text-center text-gray-600 mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Language learning on your schedule, with teachers you can trust. For language learners just like you.
                    </motion.p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[{
                            img: course2,
                            title: '1. Verified teachers',
                            desc: 'Our community has over 10,000 expert tutors – all with prior teaching experience, vetted by our team.'
                        }, {
                            img: course1,
                            title: '2. Affordable lessons',
                            desc: 'With lesson prices starting at $20, Verbling provides remote language learning to fit any budget.'
                        }, {
                            img: course3,
                            title: '3.Convenience & flexibility',
                            desc: 'We make learning happen on your schedule. Book lessons whenever you want to learn.'
                        }].map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 + idx * 0.15 }}
                                viewport={{ once: true }}
                            >
                                <Card
                                    style={{ backgroundColor: "#fff" }}
                                    hoverable
                                    cover={<img alt={item.title} src={item.img} />}
                                    className="shadow-2xl bg-white "
                                >
                                    <div className="flex items-center mb-2">
                                        <h3 className="text-xl text-black font-semibold">{item.title}</h3>
                                    </div>
                                    <p className="text-gray-600">{item.desc}</p>
                                    <Button type="link" className="mt-4">Learn More</Button>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Testimonials */}
            <motion.section
                className="max-w-7xl mx-auto  py-16 grid grid-cols-12 sm:grid-cols-12 lg:grid-cols-6 gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
            >
                <motion.div
                    className="col-span-12 sm:col-span-6 lg:col-span-3 flex justify-center"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <img src={woman} alt="Content 1" className=" h-auto drop-shadow-gray-950 drop-shadow-xl" />
                </motion.div>
                <motion.div
                    className="col-span-12 sm:col-span-6 lg:col-span-3 flex justify-center items-center "
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-medium text-gray-800 mb-4">“Your platform gave me an amazing opportunity to form a new habit to learn language regularly and of course improve my language skills. I received a letter with congratulations from the team.”</h2>
                </motion.div>
            </motion.section>
            <motion.section
                className="max-w-7xl mx-auto  grid grid-cols-12 sm:grid-cols-12 lg:grid-cols-6 gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
            >
                <motion.div
                    className="col-span-12 sm:col-span-6 lg:col-span-3 mt-20"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-medium text-gray-800 mb-8">Learn English for everyday situations</h2>
                    <p className='mb-6 text-gray-600 text-xl'>Through our rotation of international teachers, you’ll be exposed to a wide variety of accents, all contexts,  expressions and cultures.</p>
                    <Button type="primary" className='px-1 py-3'>Learn Now</Button>
                    <Divider variant='dashed' style={{ borderColor: '#000', fontSize: '10px' }}></Divider>
                    <p>“My time slot didn't work well, thanks to teacher's patience and tips, very helpful!”</p>
                </motion.div>
                <motion.div
                    className="col-span-12 sm:col-span-6 lg:col-span-3 flex justify-center"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <img src={content} alt="Content 1" className=" h-auto drop-shadow-xl drop-shadow-black" />
                </motion.div>
            </motion.section>


            {/* Footer */}
            <Footer />
        </div>
    );
};


export default Home;
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import MainLayout from '../components/MainLayout.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import SignUp from '../components/SignUp.jsx';
import Login from '../components/Login.jsx';
import NotFound from '../pages/NotFound.jsx';
import Setting from '../pages/Setting.jsx';
import Profile from '../pages/Profile.jsx';
import Courses from '../pages/Courses.jsx';
import CourseDetail from '../pages/CourseDetail.jsx';
import FlashCardSection from '../components/course/FlashCardSection.jsx';
import Speaking from '../components/Speaking/Speaking.jsx';
// import CourseEnrollment from '../pages/CourseEnrollment.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            // No header for signup and login
            {
                path: '/',
                element: <SignUp />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            // All other pages use MainLayout (with header)
            {
                element: <MainLayout />, // acts as layout wrapper
                children: [
                    {
                        path: '/home',
                        element: <Home />,
                    },
                    {
                        path: '/contact',
                        element: <Contact />,
                    },
                    {
                        path: '/about',
                        element: <About />,
                    },
                    {
                        path: '/settings',
                        element: <Setting />,
                    },
                    {
                        path: '/profile',
                        element: <Profile />,
                    },
                    {
                        path: '/courses',
                        element: <Courses />,
                    },
                    {
                        path: '/courses/:id',
                        element: <CourseDetail />,
                    },
                    {
                        path: '/flashcards/:courseId/:unit',
                        element: <FlashCardSection /> // Assuming this is the component for flashcards
                    },


                ],
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
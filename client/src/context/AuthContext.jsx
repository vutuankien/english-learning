import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const api = import.meta.env.VITE_API_URL;
    // console.log("API URL:", api);
    const [session, setSession] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (session) {
            axios.get(`${api}/user/getSingleUser/${session?.id}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                });
        }
    }, [session]);

    useEffect(() => {
        const storedSession = JSON.parse(localStorage.getItem('session'));
        const storedToken = localStorage.getItem('accessToken');
        if (storedSession && storedToken) {
            setSession(storedSession);
            setAccessToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (session) localStorage.setItem('session', JSON.stringify(session));
        if (accessToken) localStorage.setItem('accessToken', accessToken);
        if (user) localStorage.setItem('user', JSON.stringify(user));
    }, [session, accessToken, user]);

    const SignInNewUser = async (email, password, recheckPassword) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${api}/auth/register`, { email, password, recheckPassword });
            setSession(response.data.user);
            setAccessToken(response.data.access_token);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Sign up failed');
            setLoading(false);
            throw err;
        }
    };

    const Login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${api}/auth/login`, { email, password });
            console.log("Response:", response.data);
            setSession(response.data.user);
            setAccessToken(response.data.access_token);
            localStorage.setItem("accessToken", response.data.access_token);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            setLoading(false);
            throw err;
        }
    };

    const logout = () => {
        setSession(null);
        setAccessToken(null);
        setError(null);
        setLoading(false);
        localStorage.removeItem('session');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                accessToken,
                SignInNewUser,
                Login,
                logout,
                error,
                setError,
                loading,
                setAccessToken,
                setLoading,
                user,
                api
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const UserAuth = () => useContext(AuthContext);
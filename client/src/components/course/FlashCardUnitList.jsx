import React, { useState, useEffect } from 'react';
import { Button, Collapse, Spin } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { UserAuth } from '../../context/AuthContext';
import axios from 'axios';
import FlashCardSection from './FlashCardSection';
import { useNavigate } from 'react-router-dom';

const FlashCardUnitList = ({ courseId }) => {
    const { api } = UserAuth();
    const [vocabs, setVocabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVocabs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${api}/vocabs/getByCourse/${courseId}`);
                setVocabs(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                setVocabs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchVocabs();
    }, [api, courseId]);

    // Gom vocab theo unit
    const vocabsByUnit = Array.isArray(vocabs) ? vocabs.reduce((acc, vocab) => {
        const unit = vocab.unit || 'Unit-Unknown';
        if (!acc[unit]) acc[unit] = [];
        acc[unit].push(vocab);
        return acc;
    }, {}) : {};

    // Lấy danh sách unit, sắp xếp tăng dần theo số unit
    const unitList = Object.keys(vocabsByUnit)
        .sort((a, b) => {
            const numA = parseInt(a.replace(/\D/g, ''), 10);
            const numB = parseInt(b.replace(/\D/g, ''), 10);
            return numA - numB;
        });

    const handleOpenUnit = (unit) => {
        navigate(`/flashcards/${courseId}/${unit}`);
        console.log(`Opening flashcards for unit: ${unit} in course: ${courseId}`);
    }

    return (
        <div className="p-4 mt-20">
            <div className="flex items-center gap-2 mb-4">
                <BookOutlined className="text-blue-600 text-xl" />
                <h2 className="text-2xl font-bold text-blue-700">Flash Cards by Unit</h2>
            </div>
            {loading ? (
                <div className="py-8 flex justify-center"><Spin /></div>
            ) : (
                <div className="flex flex-col gap-6">
                    {unitList.map(unit => (
                        <div key={unit} className="bg-white rounded-lg shadow border border-blue-100 px-4 py-3 flex items-center justify-between">
                            <span className="font-semibold text-blue-700 text-lg">{unit}</span>
                            <Button type="primary" className="bg-blue-600" onClick={() => handleOpenUnit(unit)}>
                                Open FlashCard
                            </Button>
                        </div>
                    ))}
                </div>
            )}
            {/* FlashCardSection is now shown on a dedicated route, not inline here */}
        </div>
    );
};

export default FlashCardUnitList;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookOutlined, SyncOutlined, AudioOutlined } from '@ant-design/icons';
import { Card, Button, Spin } from 'antd';
import { UserAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useSpeechSynthesis } from 'react-speech-kit';

const FlashCardSection = ({ unit: propUnit, vocabs: propVocabs, onClose }) => {
    const { api } = UserAuth();
    const { unit: urlUnit, courseId } = useParams();
    const unit = propUnit || urlUnit;
    // const courseIdFromUrl = courseId || urlCourseId;
    const [vocabs, setVocabs] = useState(propVocabs || []);
    const [loading, setLoading] = useState(!propVocabs);
    const [index, setIndex] = useState(0);
    const [showMeaning, setShowMeaning] = useState(false);
    const { speak } = useSpeechSynthesis();

    useEffect(() => {
        if (propVocabs) {
            setVocabs(propVocabs);
            setLoading(false);
            setIndex(0);
            return;
        }
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
    }, [api, courseId, propVocabs]);

    // Nếu propVocabs được truyền từ FlashCardUnitList thì không cần filter lại theo unit
    const filteredVocabs = propVocabs ? vocabs : (unit ? vocabs.filter(v => v.unit === unit) : vocabs);

    const handleNext = () => {
        setShowMeaning(false);
        setIndex((prev) => (prev + 1) % filteredVocabs.length);
    };

    const handlePrev = () => {
        setShowMeaning(false);
        setIndex((prev) => (prev - 1 + filteredVocabs.length) % filteredVocabs.length);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Spin size="large" /></div>;
    }

    if (!filteredVocabs.length) {
        return <div className="text-gray-400 text-center py-10 mt-20">No flashcards available.</div>;
    }

    const vocab = filteredVocabs[index % filteredVocabs.length];

    return (
        <div className="flex flex-col items-center justify-center py-8 mt-20">
            <div className="flex items-center gap-2 mb-6">
                <BookOutlined className="text-blue-600 text-xl" />
                <h2 className="text-2xl font-bold text-blue-700">Flash Cards {unit && <span className="ml-2 text-base text-blue-400">({unit})</span>}</h2>
            </div>
            <Card
                className="w-full max-w-md rounded-2xl shadow-xl border border-blue-200 flex flex-col items-center py-10"
                bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <div className="flex flex-col justify-center items-center gap-2 mb-2">
                    <span className="font-bold text-blue-700 text-2xl">{vocab.word}</span>

                    <div>
                        {vocab.pronunciation && (
                            <span className="text-blue-500 text-sm">[{vocab.pronunciation}]</span>
                        )}
                        {vocab.type && (
                            <span className="ml-2 text-gray-500 text-xs bg-blue-50 px-2 py-0.5 rounded">{vocab.type}</span>
                        )}
                    </div>
                    <button
                        className="ml-2 text-blue-600 hover:text-blue-800 transition"
                        onClick={() => speak({ text: vocab.word })}
                        title="Nghe phát âm"
                    >
                        <AudioOutlined className='text-xl' />
                    </button>
                </div>
                <Button
                    type="primary"
                    className="mb-4 mt-2"
                    onClick={() => setShowMeaning((v) => !v)}
                >
                    {showMeaning ? 'Hide Meaning' : 'Show Meaning'}
                </Button>
                {showMeaning && (
                    <div className="text-gray-700 text-lg text-center mb-2 px-2">
                        {vocab.meaning}
                    </div>
                )}
            </Card>
            <div className="flex gap-4 mt-6">
                <Button
                    onClick={handlePrev}
                    disabled={filteredVocabs.length <= 1}
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={filteredVocabs.length <= 1}
                    icon={<SyncOutlined />}
                >
                    Next
                </Button>
                {onClose && (
                    <Button danger onClick={onClose}>Close</Button>
                )}
            </div>
            <div className="mt-4 text-gray-500 text-sm">
                Card {index + 1} / {filteredVocabs.length}
            </div>
        </div>
    );
}

export default FlashCardSection;
import React, { useEffect, useState } from 'react';
import { BookOutlined, AudioOutlined } from '@ant-design/icons';
import { Collapse, Spin } from 'antd';
import { UserAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useSpeechSynthesis } from 'react-speech-kit';

const VocabSection = ({ courseId }) => {
    const { api } = UserAuth();
    const [vocabs, setVocabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { speak } = useSpeechSynthesis();

    // Lấy toàn bộ vocab của course
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
            // Lấy số unit từ chuỗi "Unit-12"
            const numA = parseInt(a.replace(/\D/g, ''), 10);
            const numB = parseInt(b.replace(/\D/g, ''), 10);
            return numA - numB;
        });

    // Tạo mảng items cho Collapse
    const collapseItems = unitList.map(unit => ({
        key: unit,
        label: (
            <span className="font-semibold text-blue-700 text-lg">{unit}</span>
        ),
        children: (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vocabsByUnit[unit].length === 0
                    ? <div className="text-gray-400">No vocabulary found.</div>
                    : vocabsByUnit[unit].map(vocab => (
                        <div
                            key={vocab.id}
                            className="bg-white rounded-lg shadow border border-blue-100 px-4 py-3 flex flex-col gap-1 hover:shadow-lg transition"
                        >
                            <div className='flex items-center justify-between'>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-blue-700 text-base">{vocab.word}</span>
                                        {vocab.pronunciation && (
                                            <span className="text-blue-500 text-xs">[{vocab.pronunciation}]</span>
                                        )}
                                        {vocab.type && (
                                            <span className="ml-2 text-gray-500 text-xs bg-blue-50 px-2 py-0.5 rounded">{vocab.type}</span>
                                        )}
                                    </div>
                                    {vocab.meaning && (
                                        <div className="text-gray-700 text-sm pl-1">
                                            {vocab.meaning}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button
                                        className="text-blue-600 hover:text-blue-800 transition"
                                        onClick={() => speak({ text: vocab.word })}
                                    >
                                        <AudioOutlined className='text-2xl' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }));

    return (
        <div className="p-4 mt-20">
            <div className="flex items-center gap-2 mb-4">
                <BookOutlined className="text-blue-600 text-xl" />
                <h2 className="text-2xl font-bold text-blue-700">Vocabulary</h2>
            </div>
            {loading ? (
                <div className="py-8 flex justify-center"><Spin /></div>
            ) : (
                <div className="flex flex-col gap-6">
                    <Collapse
                        accordion
                        items={collapseItems}
                        className="bg-transparent"
                        style={{ background: 'transparent', border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>
            )}
        </div>
    );
};


export default VocabSection;
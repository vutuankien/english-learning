import React, { useState, useRef, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";
import { Button } from "antd";

const Speaking = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const { api } = UserAuth();
    const [question, setQuestion] = useState("");
    const [transcript, setTranscript] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [result, setResult] = useState(null);
    const [difficulty, setDifficulty] = useState("");

    const fetchNewQuestion = () => {
        axios.get(`${api}/questions/random`)
            .then(response => {
                setQuestion(response.data.text);
                setDifficulty(response.data.difficulty);
            })
            .catch(e => {
                console.error(e);
            });
    };

    useEffect(() => {
        fetchNewQuestion();
    }, []);


    const recognitionRef = useRef(null);

    const startRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
        };

        recognitionRef.current = recognition;
        recognition.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsRecording(false);
    };

    const submitAnswer = async () => {
        const res = await fetch(`${api}/speaking/speaking-assessment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                question,
                transcript,
                userId: user?.id
            })
        });

        const data = await res.json();
        setResult(data);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg flex flex-col items-center">
                <h1 className="text-3xl font-bold text-blue-700 mb-6">Speaking Test</h1>
                <div className="w-full flex flex-col items-center mb-8">
                    <div className="text-lg font-semibold text-gray-700 mb-2">Question:</div>
                    <div className="text-xl text-center text-blue-600 font-bold bg-blue-50 rounded-lg px-6 py-4 shadow mb-2 w-full">
                        {question}
                    </div>
                    <div>
                        <span className="text-lg font-semibold text-gray-700 mb-2">Difficulty: </span>
                        <span className="text-xl text-blue-600 font-bold">{difficulty}</span>
                    </div>
                    <div className="mt-5">
                        <Button type="primary" onClick={fetchNewQuestion}>Get Other Question</Button>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full items-center mb-6">
                    <div className="flex gap-4 w-full justify-center">
                        <button
                            onClick={startRecording}
                            disabled={isRecording}
                            className={`px-6 py-2 rounded-lg font-semibold shadow transition-all ${isRecording ? 'bg-gray-300 text-gray-500' : 'bg-green-500 text-white hover:bg-green-600'}`}
                        >
                            Start
                        </button>
                        <button
                            onClick={stopRecording}
                            disabled={!isRecording}
                            className={`px-6 py-2 rounded-lg font-semibold shadow transition-all ${!isRecording ? 'bg-gray-300 text-gray-500' : 'bg-red-500 text-white hover:bg-red-600'}`}
                        >
                            Stop
                        </button>
                    </div>
                    <div className="w-full text-center mt-2">
                        <span className="font-medium text-gray-600">Transcript:</span>
                        <div className="mt-1 text-blue-700 bg-blue-50 rounded px-3 py-2 min-h-[32px] inline-block w-full">
                            {transcript || <span className="text-gray-400">(No transcript yet)</span>}
                        </div>
                    </div>
                    <button
                        onClick={submitAnswer}
                        disabled={!transcript}
                        className={`mt-4 px-8 py-2 rounded-lg font-semibold shadow transition-all ${!transcript ? 'bg-gray-300 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Submit
                    </button>
                </div>
                {result && (
                    <div className=" w-full">
                        <h2 className="text-xl font-bold text-green-700 mb-4">Result</h2>
                        <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-700">Pronunciation</span>
                                    <span className="font-bold text-blue-700">{result.pronunciation}/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded h-3">
                                    <div className="bg-blue-500 h-3 rounded" style={{ width: `${(result.pronunciation / 10) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-700">Fluency</span>
                                    <span className="font-bold text-blue-700">{result.fluency}/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded h-3">
                                    <div className="bg-blue-500 h-3 rounded" style={{ width: `${(result.fluency / 10) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-700">Grammar & Vocabulary</span>
                                    <span className="font-bold text-blue-700">{result.grammar_vocab}/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded h-3">
                                    <div className="bg-blue-500 h-3 rounded" style={{ width: `${(result.grammar_vocab / 10) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-700">Content</span>
                                    <span className="font-bold text-blue-700">{result.content}/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded h-3">
                                    <div className="bg-blue-500 h-3 rounded" style={{ width: `${(result.content / 10) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="font-semibold text-gray-700 mb-1">Feedback:</div>
                                <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded shadow-sm text-base">
                                    {result.feedback}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Speaking;

import React, { useState } from 'react'

const PracticeSection = () => {
    const [input, setInput] = useState('')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleCheck = async () => {
        setLoading(true)
        setResult(null)
        // Fake API call, replace with your backend endpoint
        setTimeout(() => {
            if (input.toLowerCase().includes('goed')) {
                setResult({
                    correct: false,
                    suggestion: 'Did you mean "went" instead of "goed"?',
                    explanation: '"Goed" is not the correct past tense of "go". The correct form is "went".'
                })
            } else {
                setResult({ correct: true })
            }
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[350px] py-8 mt-20">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Grammar Check</h2>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter your sentence..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button
                    onClick={handleCheck}
                    disabled={!input || loading}
                    className={`w-full py-2 rounded-lg font-semibold shadow transition-all mb-4 ${!input || loading ? 'bg-gray-300 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    {loading ? 'Checking...' : 'Check Grammar'}
                </button>
                {result && (
                    <div className="w-full mt-2">
                        {result.correct ? (
                            <div className="bg-green-50 border-l-4 border-green-400 text-green-800 p-4 rounded shadow-sm text-base">
                                ✅ Your sentence is correct!
                            </div>
                        ) : (
                            <div className="bg-red-50 border-l-4 border-red-400 text-red-800 p-4 rounded shadow-sm text-base">
                                ❌ Incorrect grammar.<br />
                                <span className="font-semibold">Suggestion:</span> {result.suggestion}<br />
                                <span className="font-semibold">Explanation:</span> {result.explanation}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PracticeSection
const supabase = require('../config/supabase_config');
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));
class SpeakingController {

    async speakingAssessment(req, res) {
        try {
            const { question, transcript, userId } = req.body;
            const prompt = `
                Bạn là giám khảo IELTS Speaking.Câu hỏi: "${question}"
                Câu trả lời: "${transcript}"
                Hãy chấm điểm theo thang 0-10 cho 4 tiêu chí:
                    - Pronunciation
                    - Fluency
                    - Grammar & Vocabulary
                    - Content Relevance
                Trả về JSON dạng:
                {
                    "pronunciation": số,
                    "fluency": số,
                    "grammar_vocab": số,
                    "content": số,
                    "feedback": "nhận xét ngắn"
                }
    `;
            const response = await fetch("https://api.together.xyz/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7
                })
            });
            const data = await response.json();
            console.log('TOGETHERAPI response:', data);
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                return res.status(500).json({ error: 'TOGETHERAPI API error', detail: data });
            }

            const content = data.choices[0].message.content;
            console.log('AI content:', content);
            // Fix escaped underscores if present
            let fixedContent = content.replace(/\\_/g, '_');
            let scoreData;
            try {
                scoreData = JSON.parse(fixedContent);
            } catch (e) {
                return res.status(500).json({ error: 'Invalid JSON from AI', raw: content });
            }

            // Lưu DB
            await supabase.from("speaking_results").insert([{
                user_id: userId,
                question,
                transcript,
                pronunciation: scoreData.pronunciation,
                fluency: scoreData.fluency,
                grammar_vocab: scoreData.grammar_vocab,
                content: scoreData.content,
                feedback: scoreData.feedback
            }]);

            res.json(scoreData);

        } catch (error) {
            console.error('Error uploading assessment:', error);
            return res.status(500).json({ error: 'Internal server error' });

        }
    }

    async getAllSpeaking(req, res) {
        const { data, error } = await supabase.from('speaking').select('*');
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }

}

module.exports = new SpeakingController();

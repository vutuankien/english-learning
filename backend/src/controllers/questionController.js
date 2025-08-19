const supabase = require('../config/supabase_config');

class QuestionController {
    async getAllQuestions(req, res) {
        const { data, error } = await supabase.from('questions').select('*');
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }

    async getSingleQuestion(req, res) {
        const { id } = req.params;
        const { data, error } = await supabase.from('questions').select('*').eq('id', id).single();
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }

    async getRandomQuestion(req, res) {
        const { data, error } = await supabase.from('questions').select('*');
        if (error) return res.status(500).json({ error: error.message });
        // Lấy 1 câu hỏi ngẫu nhiên
        const randomQuestion = data[Math.floor(Math.random() * data.length)];
        res.json(randomQuestion);
    }

    async createQuestion(req, res) {
        const { courseId } = req.params;
        // Check if req.body exists and has required properties
        if (!req.body || !req.body.text || !req.body.difficulty) {
            return res.status(400).json({ error: 'Missing required fields: text and difficulty' });
        }
        const { text, difficulty } = req.body;
        console.log("Creating question with body:", req.body);
        const { data, error } = await supabase.from('questions').insert([{ text, difficulty, course_id: courseId }]).select('*');
        if (error) return res.status(500).json({ error: error.message });
        res.status(201).json(data);
    }

    async updateQuestion(req, res) {
        const { id, courseId } = req.params;
        const { text, difficulty } = req.body;
        const { data, error } = await supabase.from('questions').update({ text, difficulty, course_id: courseId }).eq('id', id);
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }

    async deleteQuestion(req, res) {
        const { id, courseId } = req.params;
        const { data, error } = await supabase.from('questions').delete().eq('id', id).eq('course_id', courseId);
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }


}

module.exports = new QuestionController();

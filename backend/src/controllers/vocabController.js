const supabase = require('../config/supabase_config');

class VocabController {
    async getAllVocab(req, res) {
        const { data, error } = await supabase.from('vocabs').select('*');
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }

    async getSingleVocab(req, res) {
        const { id } = req.params;
        const { data, error } = await supabase.from('vocabs').select('*').eq('id', id).single();
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }

    async createVocab(req, res) {
        const { word, meaning, type, pronunciation, unit } = req.body;
        const { data, error } = await supabase.from('vocabs').insert([{ word, meaning, type, pronunciation, unit }]);
        if (error) return res.status(500).json({ error: error.message });
        res.status(201).json(data);
    }

    async updateVocab(req, res) {
        const { id } = req.params;
        const { word, meaning, type, pronunciation, unit } = req.body;
        const { data, error } = await supabase.from('vocabs').update({ word, meaning, type, pronunciation, unit }).eq('id', id);
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }
    async getVocabByUnit(req, res) {
        const { unit, courseId } = req.params;
        const { data, error } = await supabase.from('vocabs').select('*').eq('unit', unit).eq('course_id', courseId);
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }
    async getVocabByCourse(req, res) {
        const { courseId } = req.params;
        const { data, error } = await supabase.from('vocabs').select('*').eq('course_id', courseId);
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }

    async deleteVocab(req, res) {
        const { id } = req.params;
        const { data, error } = await supabase.from('vocabs').delete().eq('id', id);
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }

}

module.exports = new VocabController();

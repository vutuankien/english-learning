const supabase = require('../config/supabase_config');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class CourseController {
    async getAllCourses(req, res) {
        const { data, error } = await supabase.from('courses').select('*');
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(data);
    }

    async getSingleCourse(req, res) {
        const { id } = req.params;
        const { data, error } = await supabase.from('courses').select('*').eq('id', id).single();
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(data);
    }
    async createCourse(req, res) {
        let image_url = req.body.image_url;

        if (req.file) {
            const fileExt = path.extname(req.file.originalname).toLowerCase();
            const allowedExts = ['.jpg', '.jpeg', '.png'];
            if (!allowedExts.includes(fileExt)) {
                return res.status(400).json({ error: `Only ${allowedExts.join(', ')} files are allowed` });
            }
            const fileName = `${uuidv4()}${fileExt}`;
            const filePath = `zycg19_0/${fileName}`;

            console.log('Uploading to:', filePath);
            const { data: storageData, error: storageError } = await supabase.storage
                .from('courses-images')
                .upload(filePath, req.file.buffer, {
                    contentType: req.file.mimetype,
                    upsert: true,
                });
            if (storageError) {
                console.error('Storage error:', storageError);
                return res.status(500).json({ error: storageError.message });
            }

            const { data: publicUrlData } = supabase.storage
                .from('courses-images')
                .getPublicUrl(filePath);
            image_url = publicUrlData.publicUrl;
            console.log('Generated URL:', image_url);
        }
        const { title, description, grade, created_by } = req.body;

        console.log("create course body: ", JSON.stringify(req.body, null, 2));
        if (!title || !description || !grade || !created_by || !image_url) {
            return res.status(400).json({ error: "Missing required fields" });
        }


        const { data, error } = await supabase.from('courses').insert([{ title, description, grade, created_by, image_url }]);
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(JSON.stringify(data, null, 2));
    }

}

module.exports = new CourseController();

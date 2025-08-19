const supabase = require('../config/supabase_config');

const { v4: uuidv4 } = require('uuid');
const path = require('path');

class UserController {

    // Combined upload avatar and update user info
    async updateUser(req, res) {
        const { id } = req.params;
        let image_url = req.body.image_url;

        let access_token = null;
        if (req.headers && req.headers.authorization) {
            const parts = req.headers.authorization.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') {
                access_token = parts[1];
                console.log('Received access_token:', access_token.substring(0, 10) + '...');
            }
        } else {
            console.warn('No Authorization header found');
        }

        if (req.file) {
            const fileExt = path.extname(req.file.originalname).toLowerCase();
            const allowedExts = ['.jpg', '.jpeg', '.png'];
            if (!allowedExts.includes(fileExt)) {
                return res.status(400).json({ error: `Only ${allowedExts.join(', ')} files are allowed` });
            }
            const fileName = `${uuidv4()}${fileExt}`;
            const filePath = `ythq14_0/${fileName}`;

            console.log('Uploading to:', filePath);
            const { data: storageData, error: storageError } = await supabase.storage
                .from('avatar-images')
                .upload(filePath, req.file.buffer, {
                    contentType: req.file.mimetype,
                    upsert: true,
                });
            if (storageError) {
                console.error('Storage error:', storageError);
                return res.status(500).json({ error: storageError.message });
            }

            const { data: publicUrlData } = supabase.storage
                .from('avatar-images')
                .getPublicUrl(filePath);
            image_url = publicUrlData.publicUrl;
            console.log('Generated URL:', image_url);
        }

        const { full_name, grade, phone } = req.body;
        const updateData = { full_name, grade, phone };
        if (image_url) updateData.image_url = image_url;

        const headers = {};
        if (access_token) {
            headers.Authorization = `Bearer ${access_token}`;
        }
        console.log('Updating user with id:', id, 'data:', updateData);
        const { data, error } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) {
            console.error('Update error:', error);
            return res.status(500).json({ error: error.message });
        }
        if (!data || data.length === 0) {
            console.warn('No data returned from update query, checking id:', id);
        } else if (data.length > 1) {
            console.warn('Multiple rows returned for id:', id);
        }
        console.log("req body:", req.body);
        console.log("req file:", req.file);
        console.log('User updated successfully, data:', data);
        res.json({ success: true, data: data || [] });
    }

    async getAllUser(req, res) {
        const { data, error } = await supabase.from('users').select('*');
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }
    async getSingleUser(req, res) {
        const { id } = req.params;
        const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }




}

module.exports = new UserController();

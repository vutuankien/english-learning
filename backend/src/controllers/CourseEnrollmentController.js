const supabase = require('../config/supabase_config');

class CourseEnrollmentController {
    // Đăng ký khóa học
    async enrollCourse(req, res) {
        const { user_id, course_id } = req.params;
        console.log('Enroll course request:', { course_id, user_id });
        if (!user_id || !course_id) {
            return res.status(400).json({ error: 'Missing user_id or course_id' });
        }
        // Kiểm tra đã tồn tại chưa
        const { data: exists } = await supabase
            .from('course_enrollments')
            .select('*')
            .eq('user_id', user_id)
            .eq('course_id', course_id)
            .single();
        if (exists) {
            return res.status(400).json({ error: 'User already enrolled in this course' });
        }
        // Nếu chưa, insert mới
        const { data, error } = await supabase
            .from('course_enrollments')
            .insert([{ user_id, course_id, is_enrolled: true }]) // Thêm trường is_enrolled
            .select();
        if (error) return res.status(400).json({ error: error.message });
        res.status(200).json({ message: "User enrolled successfully", data });
    }

    // Lấy danh sách khóa học user đã đăng ký
    async getCoursesByUser(req, res) {
        const { user_id } = req.params;
        const { data, error } = await supabase
            .from('course_enrollments')
            .select('course_id, enrolled_at')
            .eq('user_id', user_id);
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }

    // Lấy danh sách user đã đăng ký một khóa học
    async getUsersByCourse(req, res) {
        const { course_id } = req.params;
        const { data, error } = await supabase
            .from('course_enrollments')
            .select('user_id, enrolled_at')
            .eq('course_id', course_id);
        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    }
}

module.exports = new CourseEnrollmentController();
const supabase = require('../config/supabase_config');
const bcrypt = require('bcrypt');

class AuthController {
    async register(req, res) {
        const { email, password, recheckPassword } = req.body;
        console.log('register request body:', req.body);
        if (password !== recheckPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const { data, error } = await supabase.auth.signUp({ email, password });

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        if (error) return res.status(400).json({ error: error.message });

        res.status(201).json({ user: data.user });
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log('login request body:', req.body);
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            //how to log the hashed password?
            if (!data || !data.user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            if (error) return res.status(400).json({ error: error.message });
            res.status(200).json({ user: data.user, access_token: data.session.access_token });
        } catch (error) {
            return res.status(500).json({ error: "Login failed unexpectedly." });
        }
    }

    async logout(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ error: 'Missing token' });
            }
            supabase.auth.setAuth(token); // Sử dụng setAuth tạm thời

            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Logout error:', error.message);
                return res.status(400).json({ error: error.message });
            }
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (err) {
            console.error('Server error in logout:', err);
            return res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = new AuthController();

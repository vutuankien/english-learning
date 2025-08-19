const createClient = require('@supabase/supabase-js').createClient;
const supabaseUrl = process.env.NODE_SUPABASE_URL;
const supabaseAnonKey = process.env.NODE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
module.exports = supabase;
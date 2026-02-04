const SUPABASE_URL = 'https://hqnzsrfudzznfowabmfy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5bnhVPzQkm07g6XPhpISZA_1wZgPiTt';

// Creamos el cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

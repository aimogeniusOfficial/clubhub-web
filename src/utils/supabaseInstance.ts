import { createClient } from '@supabase/supabase-js';
import { Database } from 'types/generated/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_ANON_KEY;

const supabaseInstance = createClient<Database>(supabaseUrl, supabaseKey);

export default supabaseInstance;

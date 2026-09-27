import { createClient } from '@supabase/supabase-js'

// Apne Supabase dashboard se URL aur ANON KEY copy karke yahan daalo
// Best practice: Inhe .env file mein VITE_SUPABASE_URL aur VITE_SUPABASE_ANON_KEY ke naam se save karna
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'TUMHARA_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'TUMHARA_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
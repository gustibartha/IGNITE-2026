import { createClient } from '@supabase/supabase-js'

// Extract only the base origin (e.g. https://xxx.supabase.co) and strip any paths like /rest/v1
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseUrl = rawUrl.startsWith('http') ? new URL(rawUrl).origin : rawUrl;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use service role key for server-side actions to bypass RLS if needed
export const supabase = createClient(supabaseUrl, supabaseServiceKey)

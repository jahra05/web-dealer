const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;

const getFunctionUrl = (functionName) => `${FUNCTIONS_URL}/${functionName}`;

const getSupabaseHeaders = () => ({
  apikey: SUPABASE_PUBLISHABLE_KEY,
  "Content-Type": "application/json",
});

export {
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  FUNCTIONS_URL,
  getFunctionUrl,
  getSupabaseHeaders,
};
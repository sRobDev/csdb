import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQ2NTYyMSwiZXhwIjoxOTUyMDQxNjIxfQ.1N85OL0iMpEu5gJ_q3XLH5mdNyAcGl4K8f_Url3qA68';

const supabaseUrl = 'https://ffcnixysulldktbpavqw.supabase.co';

export default async function handler(req, res) {
  const { limit = 20 } = req.query;
  const supabase = createClient(supabaseUrl, SUPABASE_KEY);
  const { data, error } = await supabase
    .from('players')
    .select()
    .limit(limit);
  if(error) res.status(500).json(error);
  res.status(200).json(data);
}

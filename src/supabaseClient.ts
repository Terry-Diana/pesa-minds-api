import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey: string = process.env.REACT_APP_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

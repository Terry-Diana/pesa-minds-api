// src/services/tipsService.ts
import supabase from "../config/supabaseClient";

interface Tip {
    user_id: string;
    message: string;
    trigger_type: string;
    trigger_value: number;
}

export const addTip = async (tip: Tip) => {
    const { data, error } = await supabase.from('tips').insert([tip]);
    if (error) throw error;
    return data;
};

export const listTips = async (userId: string) => {
    const { data, error } = await supabase.from('tips').select('*').eq('user_id', userId);
    if (error) throw error;
    return data;
};

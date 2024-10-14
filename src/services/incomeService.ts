// src/services/incomeService.ts
import supabase from "../config/supabaseClient";

interface Income {
    user_id: string;
    source: string;
    amount: number;
    date: Date;
}

export const addIncome = async (income: Income) => {
    const { data, error } = await supabase.from('income').insert([income]);
    if (error) throw error;
    return data;
};

export const listIncome = async (userId: string) => {
    const { data, error } = await supabase.from('income').select('*').eq('user_id', userId);
    if (error) throw error;
    return data;
};

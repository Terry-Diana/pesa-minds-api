// src/services/expenseService.ts
import supabase from "../config/supabaseClient";

interface Expense {
    user_id: string;
    category: string;
    amount: number;
    date: Date;
    description?: string;
}

export const addExpense = async (expense: Expense) => {
    const { data, error } = await supabase.from('expenses').insert([expense]);
    if (error) throw error;
    return data;
};

export const listExpenses = async (userId: string) => {
    const { data, error } = await supabase.from('expenses').select('*').eq('user_id', userId);
    if (error) throw error;
    return data;
};

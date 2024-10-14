// src/services/budgetService.ts
import supabase from "../config/supabaseClient";

interface Budget {
    user_id: string;
    name: string;
    amount: number;
    start_date?: Date;
    end_date?: Date;
}

export const createBudget = async (budget: Budget) => {
    const { data, error } = await supabase.from('budgets').insert([budget]);
    if (error) throw error;
    return data;
};

export const listBudgets = async (userId: string) => {
    const { data, error } = await supabase.from('budgets').select('*').eq('user_id', userId);
    if (error) throw error;
    return data;
};

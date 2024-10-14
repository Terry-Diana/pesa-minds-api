// src/services/authService.ts
import supabase from "../config/supabaseClient";

export interface AuthServiceError extends Error {
    details?: any;
}

export const createAuthServiceError = (message: string, details?: any): AuthServiceError => {
    const error: AuthServiceError = new Error(message) as AuthServiceError;
    error.details = details;
    return error;
};

export const createUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        throw createAuthServiceError("User creation failed", error.message); 
    }
    return data; 
};

export const loginUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        throw createAuthServiceError("Login failed", error.message);
    }
    return data;
};

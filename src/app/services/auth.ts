import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private supabase: SupabaseService) { }

    async registrar(nombre: string, email: string, password: string) {
        const { data, error } = await this.supabase.client.auth.signUp({ email, password });
        if (error) throw error;
        if (data.user) {
            const { error: errPerfil } = await this.supabase.client
                .from('perfiles')
                .insert({ id: data.user.id, nombre, email });
            if (errPerfil) throw errPerfil;
        }
        return data;
    }

    async login(email: string, password: string) {
        const { data, error } = await this.supabase.client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    }

    async logout() {
        await this.supabase.client.auth.signOut();
    }

    async sesion() {
        const { data } = await this.supabase.client.auth.getSession();
        return data.session;
    }

    async perfil() {
        const s = await this.sesion();
        if (!s) return null;
        const { data } = await this.supabase.client
            .from('perfiles').select('*').eq('id', s.user.id).single();
        return data;
    }
}
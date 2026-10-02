import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    readonly client: SupabaseClient = createClient(
        'https://jkwzzkhpzttgjxbrmold.supabase.co', // Pega aquí tu Project URL real
        'sb_publishable_kP7zsa7ZjwfHpKocChoZcg_h65tJIHH'                      // Pega aquí tu Key anon real
    );
}
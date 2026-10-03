import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // 1. Asegúrate de importar el Router aquí arriba
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  // ==========================================
  // 2. EL CONSTRUCTOR VA AQUÍ ARRIBA
  // ==========================================
  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router // <--- Inyectamos el Router aquí dentro
  ) {
    const correoInstitucionalPattern = /^[a-zA-Z0-9._%+-]+@ucaldas\.edu\.co$/;

    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(correoInstitucionalPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // ==========================================
  // 3. TUS FUNCIONES VAN AQUÍ ABAJO
  // ==========================================
  async registrarUsuario() {
    if (this.registroForm.invalid) {
      alert('Por favor, ingresa un correo institucional válido (ejemplo: usuario@ucaldas.edu.co)');
      return;
    }

    const { nombre, email, password } = this.registroForm.value;

    try {
      const { data, error } = await this.supabaseService.client.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { nombre: nombre }
        }
      });

      if (error) {
        console.error('Error al registrar:', error.message);
        alert('Error al registrar: ' + error.message);
        return;
      }

      // Guardar también en la tabla perfiles
      const userId = data.user?.id;
      if (userId) {
        await this.supabaseService.client
          .from('perfiles')
          .insert([{ id: userId, nombre: nombre, email: email }]);
      }

      alert('¡Registro exitoso!');
      this.router.navigate(['/home']); // ¡Ahora sí funcionará perfectamente!

    } catch (err) {
      console.error('Error inesperado:', err);
    }
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  nombre = '';
  email = '';
  password = '';
  errorMensaje = '';

  constructor(private auth: AuthService, private router: Router) { }

  async registrarse() {
    try {
      this.errorMensaje = '';
      await this.auth.registrar(this.nombre, this.email, this.password);
      alert('¡Registro exitoso! Ya puedes iniciar sesión.');
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMensaje = error.message || 'Ocurrió un error al registrarse';
    }
  }
}
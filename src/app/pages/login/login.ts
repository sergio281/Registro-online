import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  errorMensaje = '';

  constructor(private auth: AuthService, private router: Router) { }

  async iniciarSesion() {
    try {
      this.errorMensaje = '';
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMensaje = error.message || 'Correo o contraseña incorrectos';
    }
  }
}
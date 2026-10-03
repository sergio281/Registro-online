import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase';
import emailjs from '@emailjs/browser'; // <--- 1. Importamos EmailJS aquí arriba

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  perfil: any = null;

  // Variables de control del modal
  mostrarModal = false;
  datosAdicionales = '';
  correosDestino = '';

  constructor(private supabaseService: SupabaseService, private router: Router) { }

  async ngOnInit() {
    const { data: { session } } = await this.supabaseService.client.auth.getSession();

    if (session && session.user) {
      this.perfil = {
        email: session.user.email,
        nombre: session.user.user_metadata?.['nombre'] || 'Usuario'
      };
    }
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.datosAdicionales = '';
    this.correosDestino = '';
  }

  // =========================================================================
  // 2. MODIFICAMOS ESTA FUNCIÓN PARA QUE ENVÍE EL CORREO REAL CON EMAILJS
  // =========================================================================
  enviarDatosCorreo() {
    if (!this.datosAdicionales || !this.correosDestino) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Parámetros que viajarán a tu plantilla de correo
    const templateParams = {
      to_email: this.correosDestino,         // Correo de la persona que recibe
      nombre_usuario: this.perfil.nombre,    // Tu nombre (quien envía desde el Home)
      correo_usuario: this.perfil.email,     // Tu correo institucional
      mensaje: this.datosAdicionales         // Los datos que escribiste en el textarea
    };

    // Reemplaza con tus credenciales de EmailJS (Service ID, Template ID y Public Key)
    emailjs.send('service_cg719jq', 'template_mvwj92s', templateParams, '3VxMvN_G8EhKc4N_7')
      .then((response) => {
        console.log('¡Correo enviado con éxito!', response.status, response.text);
        alert('¡Información enviada con éxito al correo indicado!');
        this.cerrarModal();
      }, (error) => {
        console.error('Error al enviar el correo:', error);
        alert('Hubo un error al enviar el correo. Revisa la consola.');
      });
  }

  async salir() {
    await this.supabaseService.client.auth.signOut();
    this.router.navigate(['/login']);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  perfil: any = null;

  constructor(private auth: AuthService, private router: Router) { }

  async ngOnInit() {
    this.perfil = await this.auth.perfil();
  }

  async salir() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
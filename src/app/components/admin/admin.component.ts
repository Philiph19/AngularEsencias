import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users = [
    { name: 'Felipe Loaiza', email: 'philip19@gmail.com', role: 'Admin' },
    { name: 'Daniel Marín', email: 'danielm17@gmail.com', role: 'Usuario' },
    { name: 'Bryan Alzate', email: 'Bryanalz@gmail.com', role: 'Admin' }
  ];
}



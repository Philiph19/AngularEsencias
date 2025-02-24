import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Router } from '@angular/router';  
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule aquí

@Component({
  selector: 'app-form-productos',
  standalone: true,  // Esto indica que el componente es independiente
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css'],
  imports: [RouterLink, ReactiveFormsModule]  // Importa ReactiveFormsModule dentro de imports
})
export class FormProductosComponent {
  productoForm: FormGroup;
  imagenPreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(1000)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      imagen: [null, Validators.required]
    });
  }

  onImagenSeleccionada(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.productoForm.patchValue({ imagen: file });
      this.productoForm.get('imagen')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productoForm.valid) {
      console.log('Producto agregado:', this.productoForm.value);
      alert('Producto agregado exitosamente');
      this.productoForm.reset();
      this.imagenPreview = null;
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

  volver() {
    this.router.navigate(['/admin']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Archivo seleccionado:', file.name);
    }
  }

  campoInvalido(campo: string): boolean {
    return this.productoForm.get(campo)?.invalid && this.productoForm.get(campo)?.touched ? true : false;
  }
}

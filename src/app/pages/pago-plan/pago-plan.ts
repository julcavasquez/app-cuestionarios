import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plan, PlanesService  } from '../../services/planes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pago-plan',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './pago-plan.html',
  styleUrl: './pago-plan.scss'
})
export class PagoPlan implements OnInit {
  planId!: number;
  planSeleccionado: any;
  correoUsuario: string = '';
  planes: Plan[] = [];

 

  constructor(private route: ActivatedRoute,
    private planesService: PlanesService
  ) {}

  ngOnInit() {
    this.planId = Number(this.route.snapshot.paramMap.get('id'));
    this.planSeleccionado = this.planesService.getPlanById(this.planId);
  }

  getPrecioConDescuento(precio: number, descuento: number): number {
    return precio - (precio * descuento) / 100;
  }

  contactarAsesor() {
     // Validar correo antes de continuar
    if (!this.correoUsuario || !this.correoUsuario.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'Por favor ingresa un correo electrónico válido antes de continuar.',
        confirmButtonColor: '#2186ff'
      });
      return;
    }

    // Confirmación de contacto
    Swal.fire({
      title: '¿Deseas contactar a un asesor?',
      html: `
        <p>Plan seleccionado: <b>${this.planSeleccionado.nombre}</b></p>
        <p>Correo: <b>${this.correoUsuario}</b></p>
        <p>Precio con descuento: <b>S/ ${this.getPrecioConDescuento(
          this.planSeleccionado.precio,
          this.planSeleccionado.descuento
        )}</b></p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, contactar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#25D366',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        const mensaje = `Hola , me gustaría adquirir el ${this.planSeleccionado.nombre}.
          Mi correo registrado es: ${this.correoUsuario}
          Precio con descuento: S/ ${this.getPrecioConDescuento(
                    this.planSeleccionado.precio,
                    this.planSeleccionado.descuento
                  )}
          Duración: ${this.planSeleccionado.duracion}`;

        // número del asesor (puedes reemplazarlo)
        const url = `https://wa.me/51978902579?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');

        Swal.fire({
          icon: 'success',
          title: '¡Redirigiendo a WhatsApp!',
          text: 'Un asesor te atenderá en breve 😊',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }
}

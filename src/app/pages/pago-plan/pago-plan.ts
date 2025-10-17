import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pago-plan',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './pago-plan.html',
  styleUrl: './pago-plan.scss'
})
export class PagoPlan implements OnInit {
  planId!: number;
  planSeleccionado: any;
  correoUsuario: string = '';

  planes = [
    {
      id: 1,
      nombre: 'Plan Básico',
      precio: 40,
      descuento: 20,
      duracion: '1 mes',
      beneficios: [
        'Acceso ilimitado',
        'Exámenes aleatorios',
        'Feedback inmediato',
        'Simulador con puntaje final'
      ]
    },
    {
      id: 2,
      nombre: 'Plan Estándar',
      precio: 60,
      descuento: 20,
      duracion: '2 meses',
      beneficios: [
        'Todo lo del Plan Básico',
        'Mayor duración y soporte prioritario'
      ]
    },
    {
      id: 3,
      nombre: 'Plan Premium',
      precio: 80,
      descuento: 20,
      duracion: '3 meses',
      beneficios: [
        'Todo lo del Plan Estándar',
        'Acceso anticipado a nuevas funciones'
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.planId = Number(this.route.snapshot.paramMap.get('id'));
    this.planSeleccionado = this.planes.find(p => p.id === this.planId);
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

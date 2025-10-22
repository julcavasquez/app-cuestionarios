import { Injectable } from '@angular/core';

export interface Plan {
  id: number;
  nombre: string;
  precio: number;
  descuento: number;
  duracion: string;
  beneficios: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PlanesService  {
  private planes : Plan[] = [
    {
      id: 1,
      nombre: 'Plan Básico',
      precio: 40,
      descuento: 20,
      duracion: '1 mes',
      beneficios: [
        'Acceso ilimitado por',
        'Exámenes ilimitados con preguntas aleatorias.',
        'Feedback instantáneo en cada pregunta.',
        'Simulador de exámen con puntaje final.'
      ]
    },
    {
      id: 2,
      nombre: 'Plan Estándar',
      precio: 60,
      descuento: 20,
      duracion: '2 meses',
      beneficios: [
        'Acceso ilimitado por',
        'Exámenes ilimitados con preguntas aleatorias.',
        'Feedback instantáneo en cada pregunta.',
        'Simulador de exámen con puntaje final.'
      ]
    },
    {
      id: 3,
      nombre: 'Plan Premium',
      precio: 80,
      descuento: 20,
      duracion: '3 meses',
      beneficios: [
        'Acceso ilimitado por',
        'Exámenes ilimitados con preguntas aleatorias.',
        'Feedback instantáneo en cada pregunta.',
        'Simulador de exámen con puntaje final.'
      ]
    }
  ];

  constructor() {}

  /** 🔹 Obtener todos los planes */
  getPlanes() {
    return this.planes;
  }

  /** 🔹 Obtener un plan por id */
  getPlanById(id: number) {
    return this.planes.find(p => p.id === id);
  }
}

import { Component, OnInit } from '@angular/core';
import { TemasService } from '../../../services/temas';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-competencias',
  imports: [CommonModule,RouterModule],
  templateUrl: './detalle-competencias.html',
  styleUrl: './detalle-competencias.scss'
})
export class DetalleCompetencias implements OnInit {
  detalle: any[] = [];
  detalleAgrupado: any[] = [];

  constructor(private temasservices: TemasService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.temasservices.getDetalleCompetencia(id).subscribe({
      next: (res) => {
        this.detalle = res;
        this.agruparPorSubcompetencia();
      },
      error: (err) => console.error(err)
    });
  }

  agruparPorSubcompetencia() {
    const mapa = new Map();
    this.detalle.forEach((fila) => {
      const idSub = fila.id_sub_compe;
      if (!mapa.has(idSub)) {
        mapa.set(idSub, {
          subcompetencia: fila.descripcion_sub_compe,
          cod_sub_compe: fila.cod_sub_compe,
          temas: [],
        });
      }
      mapa.get(idSub).temas.push({
        cod_tema: fila.cod_tema,
        descripcion_tema: fila.descripcion_tema,
        total_preguntas: fila.total_preguntas,
      });
    });
    this.detalleAgrupado = Array.from(mapa.values());
  }

}

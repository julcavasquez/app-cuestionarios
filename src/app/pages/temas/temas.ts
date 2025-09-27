import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemasService } from '../../services/temas';

@Component({
  selector: 'app-temas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './temas.html',
  styleUrl: './temas.scss'
})

export class Temas implements OnInit {
  temas: any[] = [];

  constructor(private temaService: TemasService) {}

  ngOnInit() {
    this.temaService.getTemas().subscribe(data => {
      this.temas = data;
    });
  }
}
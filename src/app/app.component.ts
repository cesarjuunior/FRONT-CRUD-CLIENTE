import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-funcionario';
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Clientes',
        icon: 'fa fa-user',
        items: [
          {label: 'Listar', icon: 'fa fa-list', routerLink: ['/listar-cliente']},
          {label: 'Criar', icon: 'fa fa-plus', routerLink: ['/criar-cliente']},
        ]
      }
    ];
  }
}

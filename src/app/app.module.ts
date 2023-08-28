import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CadastroFormComponent} from './cadastro-form/cadastro-form.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModules} from "./app-routing.modules";
import {MenubarModule} from "primeng/menubar";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {PanelModule} from "primeng/panel";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DividerModule} from "primeng/divider";
import {TableModule} from "primeng/table";
import {HttpClientModule} from "@angular/common/http";
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {RippleModule} from "primeng/ripple";
import {RadioButtonModule} from "primeng/radiobutton";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {InputMaskModule} from "primeng/inputmask";

@NgModule({
  declarations: [
    AppComponent,
    CadastroFormComponent,
    ListarClienteComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    FormsModule,
    RouterLink,
    AppRoutingModules,
    MenubarModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    DividerModule,
    TableModule,
    HttpClientModule,
    RippleModule,
    RadioButtonModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    InputMaskModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

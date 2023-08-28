import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CadastroFormComponent} from "./cadastro-form/cadastro-form.component";
import {ListarClienteComponent} from "./listar-cliente/listar-cliente.component";

const routes: Routes = [
  { path: 'criar-cliente', component: CadastroFormComponent },
  { path: 'listar-cliente', component: ListarClienteComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModules{}

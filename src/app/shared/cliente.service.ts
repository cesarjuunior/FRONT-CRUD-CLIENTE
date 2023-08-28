import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FiltroSchema} from "../schemas/filtro.schema";

const baseUrl = 'http://localhost:8080/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  criarCliente(data:any):Observable<any> {
    return this.http.post(baseUrl, data);
  }

  alterarCliente(data:any):Observable<any> {
    return this.http.put(baseUrl, data);
  }

  recuperarClientes(numeroPagina: number, filtro: FiltroSchema):Observable<any> {
    debugger
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",numeroPagina);
    queryParams = queryParams.append("size",5);
    queryParams = this.getFiltros(filtro, queryParams);
    return this.http.get(baseUrl, {params:queryParams});
  }

  deletarCliente(id: any):Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);

  }

  private getFiltros(filtro: FiltroSchema, queryParams: HttpParams) {
    if (this.validarFiltro(filtro.nome)) {
      queryParams = queryParams.append("nome", filtro.nome);
    }
    debugger
    if (this.validarFiltro(filtro.status)) {
      queryParams = queryParams.append("status", filtro.status);
    }
    return queryParams;
  }

  validarFiltro(filtro:any):boolean{
    return filtro != undefined;
  }
}

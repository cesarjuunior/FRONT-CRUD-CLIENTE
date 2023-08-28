import {Component, OnInit, ViewChild} from '@angular/core';
import {ClienteService} from "../shared/cliente.service";
import {ConfirmationService, FilterMetadata, LazyLoadEvent, MessageService} from "primeng/api";
import {Table, TableLazyLoadEvent} from "primeng/table";
import {FiltroSchema} from "../schemas/filtro.schema";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ListarClienteComponent implements OnInit{
  clientes: any[] = [];

  totalRecords: number = 0

  loading: boolean | undefined;

  status: any;

  filtro: FiltroSchema;

  filtroStatus = [{label: 'ATIVO', value: 'ATIVO'}, {label: 'INATIVO', value: 'INATIVO'}];

  permiteEditarCliente: boolean = false;

  listaTelefones: Array<any> = [];

  formEdit: FormGroup = this.fb.group({
    id: [''],
    nome: ['', Validators.required],
    tipo: ['', Validators.required],
    cpfCnpj: ['', Validators.required],
    rgIe: [''],
    status: [''],
    dataCadastro: [''],
    contato: [''],
    ddd:[''],
    numero: ['']
  });
  modoEdicao: boolean = false;


  constructor(private service: ClienteService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private fb:FormBuilder) {
    this.filtro = {nome: '', status: ''}
  }

  ngOnInit() {
    this.loading = true;
  }

  loadData(event: TableLazyLoadEvent) {
    this.loading = true;
    debugger
    setTimeout(() => {
      const filters = event.filters ?? {};
      this.getFiltros(filters)

      this.service.recuperarClientes(this.getNumeroPagina(event.first), this.filtro).subscribe(res => {
        this.clientes = res.content;
        this.totalRecords = res.totalElements;
        this.loading = false;
      })
    }, 1000);
  }

  editarCliente(cliente: any) {
    debugger
    this.formEdit.patchValue({
      id: cliente.id,
      nome: cliente.nome,
      tipo: cliente.tipo,
      cpfCnpj: cliente.cpfCnpj,
      rgIe: cliente.rgIe,
      status: cliente.status,
      dataCadastro: cliente.dataCadastro,
    });

    this.listaTelefones = [...cliente.contato];
    this.listaTelefones.forEach(value => {
      value.permiteEditar = false;
    })
    this.permiteEditarCliente = true;
  }

  getTelefones(){
    debugger;
    return this.formEdit.get('contato')?.getRawValue()

  }

  deletarCliente(cliente: any) {
    debugger;
    this.confirmationService.confirm({
      message: 'Você tem certeza que quer deletar o cliente ' + cliente.nome + '?',
      header: 'Confirmação',
      icon: 'fa fa-exclamation',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.service.deletarCliente(cliente.id).subscribe(() => {
          this.clientes = this.clientes.filter(val => val.id !== cliente.id);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        })
      }
    });
  }

  getNumeroPagina(first: any):number{
    return first/5;
  }

  getFiltros(filters: { [p: string]: FilterMetadata | FilterMetadata[] | undefined }):any{
    debugger;
    this.filtro.nome= filters['nome'] instanceof Array ? filters['nome'][0].value : filters['nome']?.value;
    this.filtro.status = filters['status'] instanceof Array ? filters['status'][0].value : filters['status']?.value;
  }

  fecharModal() {
    this.formEdit.reset();
    this.permiteEditarCliente = false;
  }

  salvarAlteracoes() {
    const clienteAlterado = this.formEdit.getRawValue();
    clienteAlterado.contato = this.listaTelefones;
    debugger;
    this.service.alterarCliente(clienteAlterado).subscribe(()=>{
      this.permiteEditarCliente = false;
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Cliente alterado com sucesso', life: 3000});
      this.loadData({first: 0})

    })
  }

  excluirTelefone(tel: any) {
    const index = this.listaTelefones.indexOf(tel);
    if (index !== -1) {
      this.listaTelefones.splice(index, 1);
    }
  }

  editarTelefone(tel: any) {
    const index = this.listaTelefones.indexOf(tel);
    this.listaTelefones[index].permiteEditar = true;
    this.formEdit.patchValue({
      ddd: tel.ddd,
      numero: tel.numero
    })
  }

  atualizarCliente(tel: any) {
    debugger
    const index = this.listaTelefones.indexOf(tel);
    this.listaTelefones[index].ddd = this.formEdit.get('ddd')?.value;
    this.listaTelefones[index].numero = this.formEdit.get('numero')?.value;
    this.formEdit.get('ddd')?.setValue('');
    this.formEdit.get('numero')?.setValue('');
    this.listaTelefones[index].permiteEditar = false
  }

  cancelarEdicao(tel: any) {
    const index = this.listaTelefones.indexOf(tel);
    this.listaTelefones[index].permiteEditar = false;
  }
}

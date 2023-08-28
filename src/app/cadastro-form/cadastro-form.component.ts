import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService, SelectItem} from "primeng/api";
import {TelefoneSchema} from "../schemas/telefone.schema";
import {ClienteService} from "../shared/cliente.service";

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.css']
})
export class CadastroFormComponent {
  mascara?: string ;

  constructor(private fb: FormBuilder,
              private clienteService: ClienteService,
              private messageService: MessageService
  ) {}

  form: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    tipo: ['', Validators.required],
    cpfCnpj: [{value: '', disabled: true}, Validators.required],
    rgIe: [''],
    ddd:[''],
    numero: [''],
  });

  listaTelefones: Array<TelefoneSchema> = []

  adicionarTelefone() {
    let formulario = this.form.getRawValue();
    this.listaTelefones.push({
      ddd: formulario.ddd,
      numero:formulario.numero
    })
  }

  salvar() {
    if(!this.form.valid){
      this.messageService.add({severity:'info', summary: 'Aviso', detail: 'Formulário com erro', life: 3000});
      return
    }
    let formularioInclusao = this.form.getRawValue();
    formularioInclusao.contato = this.listaTelefones;
    this.clienteService.criarCliente(formularioInclusao)
      .subscribe((res) => {
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Cliente cadastrado', life: 3000});
        this.form.reset()
      });
    console.log(this.form.value);
  }

  habilitaCampoCpfCnpj(){
    this.form.get('cpfCnpj')?.enable();
  }

  defineMascara():string{
    if(this.form.get('tipo')?.value == 'PJ'){
      return '99.999.999/9999-99'
    }else {
      return '999.999.999-99'
    }
  }
}

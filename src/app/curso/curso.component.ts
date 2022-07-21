import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  //Vetor
  //tive que inicializar o vetor, ao contrário do instrutor
  vetor: Curso[] = [];  

  //Objeto da classe Curso
  curso = new Curso();
  
  //Construtor
  constructor(private curso_service: CursoService) { }

  //Inicializador
  ngOnInit() {
    //ao iniciar a aplicação, quero listar os cursos
    this.selecionar();
    
  }

  //cadastro
  cadastrar(){
    this.curso_service.cadastrarCurso(this.curso).subscribe(
      (res: Curso[]) => {

        //adicionando dados ao vetor
        this.vetor = res;

        //limpar os atributos
        //não consegui deixar os atributos como nulos, ao contrário do instrutor
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

        //atualizar a listagem
        this.selecionar();
      }
    )
  }

  //seleção
  selecionar(){
    this.curso_service.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    )
  }

  //alteração
  alterar(curso : Curso){
    this.curso_service.atualizarCurso(curso).subscribe(
      (res : any) => {

        //atualizar vetor
        this.vetor = res;

        //limpar os valores do objeto
        //não consegui deixar como nulo, ao contrário do instrutor
        this.curso = new Curso();
        

        //atualiza a listagem
        this.selecionar();
      }
    )
  }

  //remoção
  removerCurso(curso : Curso) {
    this.curso_service.removerCurso(curso).subscribe(
      (res: Curso[]) => {
        this.vetor = res;

        //não consegui deixar como nulo, ao contrário do instrutor
        this.curso = new Curso();
        this.selecionar();
      }
    )
  }

  selecionarCurso(c: Curso){
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }

}

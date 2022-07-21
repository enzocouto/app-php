import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //URL
  url = 'http://localhost/api/php/';

  //Vetor
  //tive que inicializar o vetor, ao contrário do instrutor
  vetor: Curso[] = [];
  

  constructor(private http: HttpClient) { }

  //obter todos os cursos
  //tive que colocar o res como tipo any, pois ele não reconhece 'cursos'
  obterCursos():Observable<Curso[]> {
    return this.http.get(this.url +'listar').pipe(
      map((res: any) => {
        this.vetor = res['cursos'];
        return this.vetor;
      })
    )
  }

  //cadastrar curso
  //tive que colocar o res como tipo any, pois ele não reconhece 'cursos'
  cadastrarCurso(c:Curso): Observable<Curso[]>{
    return this.http.post(this.url+'cadastrar', {cursos:c})
    .pipe(map((res: any) => {
      if(res){
        this.vetor.push(res['cursos']);
      }
     
      return this.vetor;
    }))
  }

  removerCurso(curso:Curso): Observable<Curso[]>{

    //const params = new HttpParams().set("idCurso", curso.idCurso?.toString());

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: curso,
    };


    return this.http.delete(this.url+'excluir', options)
    .pipe(map((res) => {

      const filtro = this.vetor.filter((curso) => {
        return +curso['idCurso'] !== +curso.idCurso;
      });

      return this.vetor = filtro;

    }))

  }

  atualizarCurso(c:Curso): Observable<Curso[]>{
    //executa a alteração via url
    return this.http.put(this.url+'alterar', {cursos: c})
    
    //percorre o vetor para saber o id do curso alterado
    .pipe(map((res) => {
      const cursoAlterado = this.vetor.find((item) => {
        return +item['idCurso'] === +['idCurso'];
      });

      //ao encontrar, altero o valor do vetor local
      if(cursoAlterado){
        cursoAlterado['nomeCurso'] = c['nomeCurso'];
        cursoAlterado['valorCurso'] = c['valorCurso'];
      }

      //retorno
      return this.vetor;

    }))

  }

}

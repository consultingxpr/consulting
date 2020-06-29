import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders   } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FormulaireService {

  baseUrl = environment.baseUrl;
  authToken: any;

  constructor(private http: HttpClient) { }

  createFormulaire(formulaire) {
    return this.http.post<any>(this.baseUrl + '/api/formulaire/create', formulaire, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  updateFormulaire(formulaire:any,formId:string)
  {
    return this.http.put<any>(this.baseUrl + '/api/formulaire/'+formId,formulaire, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  getByUser(id: string) {
    return this.http.get<any>(this.baseUrl + '/api/formulaire/user/' + id, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  //
  getByUserLast(id: string) {
    return this.http.get<any>(this.baseUrl + '/api/formulaire/last/' + id, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
}

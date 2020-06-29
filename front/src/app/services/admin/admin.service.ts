import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders   } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.baseUrl;
  authToken: any;

  constructor(private http: HttpClient) { }

  registerClient(user) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.post<any>(this.baseUrl + '/api/client/register', user, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }


  getClients() {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/client', {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }


  getOneClient(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/client/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  updateClient(id: string, data)  {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.put<any>(this.baseUrl + '/api/client/' + id, data, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    })
  }

  deleteClient(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.put<any>(this.baseUrl + '/api/client/delete/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    }) ;
  }

  createGroupe(groupe) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.post<any>(this.baseUrl + '/api/groupe/create', groupe, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  getOneGroupe(id) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/groupe/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  updateGroupe(id: string, data)  {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.put<any>(this.baseUrl + '/api/groupe/' + id, data, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  deleteGroupe(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.delete<any>(this.baseUrl + '/api/groupe/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    }) ;
  }
  getGroupes() {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/groupe', {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  getGroupesToTable(pageSize,pageSort,action,currentId) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/groupe/toTable'+'/'+pageSize+'/'+pageSort+'/'+action+'/'+currentId 
    , {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }


  addFeedback(feedback) {
    return this.http.post<any>(this.baseUrl + '/api/feedback/create', feedback, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  getFeedbacks() {
    return this.http.get<any>(this.baseUrl + '/api/feedback', {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  addConvention(convention) {
    return this.http.post<any>(this.baseUrl + '/api/convention/create', convention, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  deleteConvention(id: string) {
    return this.http.delete<any>(this.baseUrl + '/api/convention/' + id, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    }) ;
  }

  getConventions() {
    return this.http.get<any>(this.baseUrl + '/api/convention/all', {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}

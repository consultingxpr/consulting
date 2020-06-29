import { environment } from '../../../environments/environment'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders   } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRhService {
  authToken: any;
  baseUrl = environment.baseUrl;
  

  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this.baseUrl + '/api/user/register', user, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  
  getUsers() {
    return this.http.get<any>(this.baseUrl + '/api/user/', {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  
  getOneUser(id: string) {
    return this.http.get<any>(this.baseUrl + '/api/user/' + id, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  
  deleteUser(id: string) {
    return this.http.delete<any>(this.baseUrl + '/api/user/' + id, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  updateUser(id: string, data) {
    return this.http.put<any>(this.baseUrl + '/api/user/' + id, data, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  
  getUsersByDepart() {
    return this.http.get<any>(this.baseUrl + '/api/user/getUsersByDepart/', {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  
  getOneUserConge(id: string) {
    return this.http.get<any>(this.baseUrl + '/api/user/getOneUserConge/' + id, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  
  getOneUserAttestation(id: string) {
    return this.http.get<any>(this.baseUrl + '/api/user/getOneUser/' + id, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}

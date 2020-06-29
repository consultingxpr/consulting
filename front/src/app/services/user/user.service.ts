import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders   } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  authToken: any;

  constructor(private http: HttpClient) { }

  createUser(user) {
    return this.http.post<any>(this.baseUrl + '/api/users/create', user, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }


  getUsers() {
    return this.http.get<any>(this.baseUrl + '/api/users', {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }


  getOneUser(id: string) {
    return this.http.get<any>(this.baseUrl + '/api/users/' + id, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  updateUser(id: string, data)  {
    return this.http.put<any>(this.baseUrl + '/api/users/' + id, data, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    })
  }
  getAdminIds()
  {
    return this.http.get<any>(this.baseUrl + '/api/users/ad/adminids' , {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    })
  }

  deleteUser(id: string) {
    return this.http.put<any>(this.baseUrl + '/api/users/' + id, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    }) ;
  }



}


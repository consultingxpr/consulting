import { environment } from '../../../environments/environment'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any ;
  authToken: any;
  permissions: any = [];
  departs: any;
  client: any;
  baseUrl = environment.baseUrl;
  
  cachedRequests: Array<HttpRequest<any>> = [];
public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  constructor(private http: HttpClient) {}


  authenticateUser(user) {
    console.log("rr")
    return this.http.post<any>(this.baseUrl + '/api/users/connexion', user, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  sotreUserData(token, user) {
    localStorage.setItem('id_token' , token);
    this.user = user ;
  }



  loggedIn() {
    return !helper.isTokenExpired(localStorage.getItem('id_token'));
  }


  logout() {
    this.user = null ;
    localStorage.clear();
  }

  
  getUserType()
  {
    
    let user=this.getUserfromToken();
    var tata=user.isAdmin;
    return tata;
  }

  public getToken(): string {
    return localStorage.getItem('id_token');
  }

  getIdfromToken(): string{
    const jwtData = this.getToken().split('.')[1]
    const decodedJwtJsonData = window.atob(jwtData)
    const decodedJwtData = JSON.parse(decodedJwtJsonData)
    console.log('id: ' + decodedJwtData._id);
    return decodedJwtData._id;
  }

  getUserfromToken(){
    const jwtData = this.getToken().split('.')[1]
    const decodedJwtJsonData = window.atob(jwtData)
    const decodedJwtData = JSON.parse(decodedJwtJsonData)
    return decodedJwtData;
  }
  
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}

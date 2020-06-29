import { environment } from '../../../environments/environment'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders   } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  authToken: any;
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  createBanque(data) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post<any>(this.baseUrl + '/api/banque/create', data, {
        headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
      });
  }
  
  getBanque(id) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get<any>(this.baseUrl + '/api/banque/' + id, {
        headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
      });
  }
  
  getAllBanques() {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/banque', {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }
  
  updateBanque(id: string, data)  {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.put<any>(this.baseUrl + '/api/banque/' + id, data, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    })
  }
  
  deleteBanque(id) {
    const headers = new HttpHeaders();
      this.loadToken();
    return this.http.delete<any>(this.baseUrl + '/api/banque/' + id, {
        headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
      }) ;
  }


  ///////////////////////////////
  ///////// departement /////////

  createDepart(data) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post<any>(this.baseUrl + '/api/departement/create', data, {
        headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
      });
  }
  
  getDepart(id) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get<any>(this.baseUrl + '/api/departement/' + id, {
        headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
      });
  }
  
  getAllDeparts() {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/departement', {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }
  
  updateDepart(id: string, data)  {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.put<any>(this.baseUrl + '/api/departement/' + id, data, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    })
  }
  
  deleteDepart(id) {
    const headers = new HttpHeaders();
      this.loadToken();
    return this.http.delete<any>(this.baseUrl + '/api/departement/' + id, {
        headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
      }) ;
  }
  

  ///////////////////////////////
  ///////// Configuration /////////

  createConfig(data) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post<any>(this.baseUrl + '/api/configuration/create', data, {
        headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
      });
  }
  
  addConfig(id,data) {
    const headers = new HttpHeaders();
    return this.http.put<any>(this.baseUrl + '/api/configuration/addStruct' + id, data, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')  });
  }
  
  getConfig() {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/configuration', {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }
  
  getPostes() {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/configuration/postes', {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }
  
  updateConfig(id: string,confid: string, data)  {
    data.structId = confid;
    return this.http.put<any>(this.baseUrl + '/api/configuration/' + id, data, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  
  deleteConfig(id) {
    const headers = new HttpHeaders();
      this.loadToken();
    return this.http.delete<any>(this.baseUrl + '/api/configuration/' + id, {
        headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
      }) ;
  }



loadToken() {
  const token = localStorage.getItem('id_token');
  this.authToken = token;
}

}

import { environment } from '../../../environments/environment'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders   } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  authToken: any;
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getHolidays() {
    return this.http.get<any>(this.baseUrl + '/api/googleCalendar/', {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }


  getSoldeCogeConsomme(userId){
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/conge/solde/' + userId, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  updateconge(id: string, data)  {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.put<any>(this.baseUrl + '/api/conge/' + id, data, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    })
  }

  createConge(conge) {
    return this.http.post<any>(this.baseUrl + '/api/conge/create', conge, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  getConges() {
    return this.http.get<any>(this.baseUrl + '/api/conge/all', {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  getMyConges(id) {
    return this.http.get<any>(this.baseUrl + '/api/conge/' + id, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
   //////////////////////////////////avance///////////////////
   createAvance(avance) {
    return this.http.post<any>(this.baseUrl + '/api/avancesalaire/create', avance, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
    //////////////////////////////////pret///////////////////
    createPret(pret) {
      return this.http.post<any>(this.baseUrl + '/api/pret/create', pret, {
        headers : new HttpHeaders().append('Content-type', 'application/json')
      });
    }
  //////////////////////////////////attestation///////////////////
  updateAttestation(id: string, data)  {
    return this.http.put<any>(this.baseUrl + '/api/attestation/' + id, data, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    })
  }


  addAttestation(attestation) {
    return this.http.post<any>(this.baseUrl + '/api/attestation/create', attestation, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  getAttestations(id) {
    return this.http.get<any>(this.baseUrl + '/api/attestation/'+ id, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  getAllAttestations() {
    return this.http.get<any>(this.baseUrl + '/api/attestation/all', {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  deleteConge(id: string) {
    return this.http.delete<any>(this.baseUrl + '/api/administratif/' + id, {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getGroupes() {
    const headers = new HttpHeaders();
    return this.http.get<any>(this.baseUrl + '/api/groupe', {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }
}

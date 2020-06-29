import { environment } from '../../../environments/environment'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders   } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  authToken: any;
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getHolidays() {
    return this.http.get<any>(this.baseUrl + '/api/googleCalendar/', {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  getconges() {
    return this.http.get<any>(this.baseUrl + '/api/conge/all', {
      headers : new HttpHeaders().append('Content-type', 'application/json')
    });
  }


  registerUser(user) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.post<any>(this.baseUrl + '/api/user/register', user, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }


  getUsers() {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/user', {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }
  
  public getToken(): string {
    return localStorage.getItem('id_token');
  }


  getIdfromToken(): string{
    const jwtData = this.getToken().split('.')[1]
    const decodedJwtJsonData = window.atob(jwtData)
    const decodedJwtData = JSON.parse(decodedJwtJsonData)
    //console.log('id: ' + decodedJwtData._id);
    return decodedJwtData._id;
}


  getOneUser(id: string = this.getIdfromToken()) {
    const headers = new HttpHeaders();
    this.loadToken();
    let user: any;
    return this.http.get<any>(this.baseUrl + '/api/user/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  getOneUserImage(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/uploads/users/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  updateUser(id: string, data)  {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.put<any>(this.baseUrl + '/api/user/' + id, data, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    })
  }
deleteUser(id: string) {
  const headers = new HttpHeaders();
    this.loadToken();
  return this.http.put<any>(this.baseUrl + '/api/user/delete/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    }) ;
}

createbill(bill) {
  const headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-type', 'application/json');
  return this.http.post<any>(this.baseUrl + '/api/bill/create', bill, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
}

getbill(id) {
  const headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-type', 'application/json');
  return this.http.get<any>(this.baseUrl + '/api/bill/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
}

getAllBills() {
  const headers = new HttpHeaders();
  this.loadToken();
  return this.http.get<any>(this.baseUrl + '/api/bill', {
    headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
  });
}

getbillByClientId(id) {
  const headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-type', 'application/json');
  return this.http.get<any>(this.baseUrl + '/api/bill/getbillsByclient/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
}

getbillForClient(id) {
  const headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-type', 'application/json');
  return this.http.get<any>(this.baseUrl + '/api/bill/getbillForClient/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
}

UpdateBillStatus(id) {
  const headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-type', 'application/json');
  return this.http.put<any>(this.baseUrl + '/api/bill/UpdateBillStatus/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
}

getImagefromToken(): string{
  const jwtData = this.getToken().split('.')[1]
  const decodedJwtJsonData = window.atob(jwtData)
  const decodedJwtData = JSON.parse(decodedJwtJsonData)
  console.log('id: ' + decodedJwtData._id);
  return decodedJwtData.image;
}

UpdateBillsend(id) {
  const headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-type', 'application/json');
  return this.http.put<any>(this.baseUrl + '/api/bill/UpdateBillsend/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
}


updateBillPayment(id: string, data)  {
  const headers = new HttpHeaders();
  this.loadToken();
  return this.http.put<any>(this.baseUrl + '/api/bill/updateBillPayment/' + id, data, {
    headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
  })
}


loadToken() {
  const token = localStorage.getItem('id_token');
  this.authToken = token;
}


////////////////////////
////////////////////////
createFour(four) {
  const headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-type', 'application/json');
  return this.http.post<any>(this.baseUrl + '/api/fournisseur/create', four, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
}

getFour(id) {
  const headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-type', 'application/json');
  return this.http.get<any>(this.baseUrl + '/api/fournisseur/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
}

getAllFour() {
  const headers = new HttpHeaders();
  this.loadToken();
  return this.http.get<any>(this.baseUrl + '/api/fournisseur', {
    headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
  });
}

updateFour(id: string, data)  {
  const headers = new HttpHeaders();
  this.loadToken();
  return this.http.put<any>(this.baseUrl + '/api/fournisseur/' + id, data, {
    headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
  })
}

deleteFour(id) {
  const headers = new HttpHeaders();
    this.loadToken();
  return this.http.put<any>(this.baseUrl + '/api/fournisseur/delete/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    }) ;
}

/////////////////////////
////////////////////////
createDec(four) {
  const headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-type', 'application/json');
  return this.http.post<any>(this.baseUrl + '/api/decaissement/create', four, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
}

getDec(id) {
  const headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-type', 'application/json');
  return this.http.get<any>(this.baseUrl + '/api/decaissement/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
}

getAllDec() {
  const headers = new HttpHeaders();
  this.loadToken();
  return this.http.get<any>(this.baseUrl + '/api/decaissement', {
    headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
  });
}

updateDec(id: string, data)  {
  const headers = new HttpHeaders();
  this.loadToken();
  return this.http.put<any>(this.baseUrl + '/api/decaissement/' + id, data, {
    headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
  })
}

deleteDec(id) {
  const headers = new HttpHeaders();
    this.loadToken();
  return this.http.delete<any>(this.baseUrl + '/api/decaissement/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    }) ;
}


}

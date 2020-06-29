import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  baseUrl = environment.baseUrl;
  authToken: any;
  constructor(private http:HttpClient) { }

  createTask(task){
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.post<any>(this.baseUrl + '/api/modelTask/create', task, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  getTasks(){
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/modelTask', {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  updateService(id: string , service){
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.put<any>(this.baseUrl + '/api/service/updateService/' + id, service, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    })
  }

   updateGroupe(id: string, service)  {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.put<any>(this.baseUrl + '/api/service/' + id, service, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  createServiceModel(model){
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.post<any>(this.baseUrl + '/api/modelService/create',model, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  getModelServices(){
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/modelService', {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  updateModelService(serviceName,docList){
    const headers = new HttpHeaders();
    this.loadToken();
   const body = {
        'docsList' : docList,
    }
    console.log(docList);
    return this.http.put<any>(this.baseUrl + '/api/modelService/editByName/' + serviceName, body, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    })
  }

  createService(service){
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.post<any>(this.baseUrl + '/api/service/create',service, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  getServices(){
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/service', {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }


  getYearsFromServices(){
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/service/getYears', {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }


  getOneService(id) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/service/getbyId/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  
  getServicesByYear(year) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/service/getServicesByYear/' + year, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  getServicesByIds(ids) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/service/getServicesByIds/' + ids, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  getServicesByClientId(id) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/service/getServicesByClientId/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  getServicesForbillByIds(ids) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.get<any>(this.baseUrl + '/api/service/getServicesForbillByIds/' + ids, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  deleteService(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.delete<any>(this.baseUrl + '/api/service/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    }) ;
  }

  UpdateBilledStatus(ids) {
    const headers = new HttpHeaders();
    this.loadToken();
    return this.http.put<any>(this.baseUrl + '/api/service/UpdateBilledStatus/' + ids, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }

  downloadDoc(file: String){
    this.loadToken();
     const body = {filename : file};
     return this.http.post<any>(this.baseUrl + '/api/documents/download',body,{
       responseType : 'blob' as 'json',
       headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')

     })
  }

 updateMontant(id: string, montant)  {
    const headers = new HttpHeaders();
    this.loadToken();
    const body = {'montant' : montant};
    return this.http.put<any>(this.baseUrl + '/api/service/updateMontant/' + id, body, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
  }



  /////////////////////////
////////////////////////
createTimesheet(four) {
  const headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-type', 'application/json');
  return this.http.post<any>(this.baseUrl + '/api/timesheet-back/create', four, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
}

getTimesheet(id) {
  const headers = new HttpHeaders();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-type', 'application/json');
  return this.http.get<any>(this.baseUrl + '/api/timesheet-back/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    });
}

  
getTimesheetsByYear(year,user) {
  const headers = new HttpHeaders();
  this.loadToken();
  return this.http.get<any>(this.baseUrl + '/api/timesheet-back/getTimesheetsByYear/' + year +'/'+ user, {
    headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
  });
}

getTimesheetsByMonth(year,user,month) {
  const headers = new HttpHeaders();
  this.loadToken();
  return this.http.get<any>(this.baseUrl + '/api/timesheet-back/getTimesheetsByMonth/' + year +'/'+ user +'/'+month, {
    headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
  });
}

updateTimesheet(id: string, data)  {
  const headers = new HttpHeaders();
  this.loadToken();
  return this.http.put<any>(this.baseUrl + '/api/timesheet-back/' + id, data, {
    headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
  })
}

deleteTimesheet(id) {
  const headers = new HttpHeaders();
    this.loadToken();
  return this.http.delete<any>(this.baseUrl + '/api/timesheet-back/' + id, {
      headers : new HttpHeaders().append('Authorization', this.authToken).append('Content-type', 'application/json')
    }) ;
}

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}

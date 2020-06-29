import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  baseUrl = environment.baseUrl;
  authToken: any;

  constructor(private http: HttpClient) { }
  uploadDocument(file: File, id, formId,date_balance) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.baseUrl + '/api/balance/importer-balance/' + id + '/'+ formId + '/'+date_balance, formData, {
      headers: new HttpHeaders()
    });
  }
  uploadDocuments(filesToUpload: any, id, index,formId,date_bilan,date_etat) {
    const formData: any = new FormData();
    const files: Array<File> = filesToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    console.log(formData)
    /*/importer-biletat/:id/:index* */
    return this.http.post<any>(this.baseUrl + '/api/balance/importer-biletat/'+id+'/'+index+'/'+formId+'/'+date_bilan+'/'+date_etat, formData, {
      headers: new HttpHeaders()
    });
  }



  getBilan()
  {
    return this.http.get<any>(this.baseUrl + '/api/bilan/', {
      headers: new HttpHeaders().append('Content-type', 'application/json')
    })
  }
  getBilanById(id)
  {
    return this.http.get<any>(this.baseUrl+ '/api/bilan/'+id, {
      headers: new HttpHeaders().append('Content-type', 'application/json')
    })
  }
  getEtatById(id)
  {
    return this.http.get<any>(this.baseUrl+ '/api/etat/'+id, {
      headers: new HttpHeaders().append('Content-type', 'application/json')
    })
  }
  getBalnceById(id) {
    return this.http.get<any>(this.baseUrl + '/api/balance/' + id, {
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  getRapportById(id)
  {
    return this.http.get<any>(this.baseUrl + '/api/rapport/' + id, {
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  getTodayRapports()
  {
    return this.http.get<any>(this.baseUrl + '/api/rapport/today', {
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }
}

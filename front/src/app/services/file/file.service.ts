import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private _http:HttpClient) { }
  downloadFile(file:String){
    var body = {filename:file};

    return this._http.post('http://localhost:4000/api/file/upload',body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
}
}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {ToasterService} from 'angular2-toaster';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders   } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  authToken: any;
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  createNotification(notification) {
    return this.http.post<any>(this.baseUrl + '/api/notification/create', notification, {
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  getNotification(id) {
    return this.http.get<any>(this.baseUrl + '/api/notification/user/' + id, {
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  seennotification(userId) {
    return this.http.put<any>(this.baseUrl + '/api/notification/seen/' + userId, {
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }



}

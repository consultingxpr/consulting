import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  authToken: any;
  baseUrl = environment.baseUrl;
  public livraisons: any;
  constructor(private http: HttpClient) { }


  getBunch(skip, limit, sort, sortOrder, searchText, entity, query?) {
    let obj = {
      entity: entity,
      sort: sort,
      sortOrder: sortOrder,
      searchText: searchText,
      query: query
    }
    return this.http.put<any>(this.baseUrl + '/api/file/' + skip + '/' + limit, obj, {
      headers: new HttpHeaders().append('Content-type', 'application/json')
    }).pipe(map(res => res.obj.docs));
  }

  getCount(entity,query?) {

    return this.http.get<any>(this.baseUrl + '/api/file/nbr/' + entity, {
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }
  getCountWithId(entity,id)
  {
    return this.http.get<any>(this.baseUrl + '/api/file/nbr/' + entity+'/'+id, {
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<any>(this.baseUrl + '/file/upload', formData, {
      headers: new HttpHeaders()
    });
  }


}

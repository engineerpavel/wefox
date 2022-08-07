import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocationModel } from '../../models/tabledata.model';
import { concat, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudTableService {
  constructor(private http: HttpClient) {}

  getList(): Observable<LocationModel[]> {
    return this.http.get<LocationModel[]>(
      `${environment.baseUrl}/api/v1/posts`
    );
  }

  showItem(itemId: string): Observable<LocationModel> {
    return this.http.get<LocationModel>(
      `${environment.baseUrl}/api/v1/posts/${itemId}`
    );
  }

  createItem(item: LocationModel): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/posts`, item);
  }

  updateItem(item: LocationModel, itemId: string): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/v1/posts/${itemId}`, item);
  }

  removeItem(itemId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v1/posts/${itemId}`);
  }

  removeItems(itemIds: string[]): Observable<any> {
    const requests: Observable<Object>[] = [];
    itemIds.forEach((id) => {
      requests.push(
        this.http.delete(`${environment.baseUrl}/api/v1/posts/${id}`)
      );
    });
    return concat(...requests);
  }
}

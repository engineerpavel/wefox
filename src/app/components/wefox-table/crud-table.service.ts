import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ITableData } from '../../interfaces/tabledata.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudTableService {
  constructor(private http: HttpClient) {}

  getList(): Observable<ITableData[]> {
    return this.http.get<ITableData[]>(`${environment.baseUrl}/api/v1/posts`);
  }

  showItem(itemId: string): Observable<ITableData> {
    return this.http.get<ITableData>(
      `${environment.baseUrl}/api/v1/posts/${itemId}`
    );
  }

  createItem(item: ITableData): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/posts`, item);
  }

  updateItem(item: ITableData, itemId: string): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/v1/posts/${itemId}`, item);
  }

  removeItem(itemId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v1/posts/${itemId}`);
  }
}

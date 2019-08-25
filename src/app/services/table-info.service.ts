import { TableInfos } from './../interfaces/table-infos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableInfoService {

  constructor(
    private http: HttpClient,
  ) { }

  getInfos(url): Observable<TableInfos[]> {
    return this.http.get<TableInfos[]>(url);
  }
}

import { TableInfos } from './../interfaces/table-infos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableInfoService {

  /**
   * @internal
   */
  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get the content from the json API
   * @param url The url to fetch data
   */
  getInfos(url: string): Observable<TableInfos[]> {
    return this.http.get<TableInfos[]>(url);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { INewsInformation, INewsList } from '../models/news';

const apiConfig = {
  apiUrl: `${environment.apiUrl}/api/news`,
};

@Injectable({
  providedIn: 'root',
})
export class AutodocService {
  constructor(private http: HttpClient) {}

  getNewsList(
    pageNumber: number = 1,
    elementsCount: number = 10
  ): Observable<INewsList> {
    return this.http.get<INewsList>(
      `${apiConfig.apiUrl}/${pageNumber}/${elementsCount}`
    );
  }

  getNewsInfoimationByName(name: string): Observable<INewsInformation> {
    return this.http.get<INewsInformation>(
      `${apiConfig.apiUrl}/item/avto-novosti/${name}`
    );
  }
}

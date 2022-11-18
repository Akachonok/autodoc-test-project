import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ICarsList, ICarInformation } from '../models/cars';

const apiConfig = {
  apiUrl: `${environment.apiUrl}/api/news`,
};

@Injectable({
  providedIn: 'root',
})
export class AutodocService {
  constructor(private http: HttpClient) {}

  getCarsList(
    pageNumber: number = 1,
    elementsCount: number = 10
  ): Observable<ICarsList> {
    return this.http.get<ICarsList>(
      `${apiConfig.apiUrl}/${pageNumber}/${elementsCount}`
    );
  }

  getCarInfoimationByName(name: string): Observable<ICarInformation> {
    return this.http.get<ICarInformation>(
      `${apiConfig.apiUrl}/item/avto-novosti/${name}`
    );
  }
}

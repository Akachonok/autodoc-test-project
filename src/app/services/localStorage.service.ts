import { Injectable } from '@angular/core';
import { INews } from '../models/news';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveState(state: INews): void {
    const newState = this.getState() || [];

    newState.push(state);

    localStorage.setItem('state', JSON.stringify(newState));
  }

  getState(): INews[] {
    return JSON.parse(localStorage.getItem('state') || '') || [];
  }
}

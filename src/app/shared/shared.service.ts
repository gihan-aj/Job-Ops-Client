import { Injectable } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { HttpService } from './services/http.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  httpService: HttpService;

  constructor(private _httpService: HttpService) {
    this.httpService = _httpService;
  }
}

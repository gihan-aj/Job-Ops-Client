import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { Register } from '../shared/models/account/register';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpService: HttpService) {}

  register(model: Register) {
    return this.httpService.post(
      `${environment.appUrl}/api/account/register`,
      model,
      {}
    );
  }
}

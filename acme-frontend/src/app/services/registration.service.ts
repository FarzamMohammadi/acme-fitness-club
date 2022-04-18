import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from '../Registration';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'https://localhost:7224/api/registrations';
  constructor(private http: HttpClient) {}

  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.apiUrl);
  }
}

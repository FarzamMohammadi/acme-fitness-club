import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from '../Registration';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'https://localhost:7224/api/registrations';
  constructor(private http: HttpClient) {}

  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.apiUrl);
  }

  getRegistrationsViaActivity(activity: string): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.apiUrl + '/activity/' + activity);
  }

  addNewRegistration(
    registration: Registration
  ): Promise<Registration | undefined> {
    return this.http
      .post<Registration>(this.apiUrl, registration, httpOptions)
      .toPromise();
  }
}

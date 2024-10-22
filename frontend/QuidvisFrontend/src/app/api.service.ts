import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://localhost:7270/api'; 
  constructor(private http: HttpClient) {}

  // Fetch all properties or filter by clientId
  getProperties(clientId?: string | null): Observable<any[]> {
    if (clientId) {
      // Fetch properties filtered by clientId
      return this.http.get<any[]>(`${this.apiUrl}/properties?clientId=${clientId}`);
    } else {
      // Fetch all properties
      return this.http.get<any[]>(`${this.apiUrl}/properties`);
    }
  }

  // Fetch all audits or filter by propertyId
  getAudits(propertyId: string | null): Observable<any[]> {
    if (propertyId) {
      // Fetch audits filtered by propertyId
      return this.http.get<any[]>(`${this.apiUrl}/audits?propertyId=${propertyId}`);
    } else {
      // Fetch all audits
      return this.http.get<any[]>(`${this.apiUrl}/audits`);
    }
  }

  // Fetch all clients (for the dropdown)
  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clients`);
  }
}

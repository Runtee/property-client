import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { propertyInterface } from './interfaces/interfaces';
import { CONFIG } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private formData: any = null;

  setFormData(data: any): void {
    this.formData = data;
  }

  getFormData(): any {
    return this.formData;
  }

  constructor(private http: HttpClient) { }

  private postRequest(url: string, data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'multipart/form-data')
      // .set('Authorization', 'Bearer your_token_here') // Replace with your actual authentication token
      // .set('Access-Control-Allow-Origin', '*');
    return this.http.post<any>(url, data, { headers, observe: 'body', responseType: 'json' })
      .pipe(catchError(this.handleError));
  }
  // private postRequestWithMedia(url: string, data: any, file?: File): Observable<any> {
  //   const formData = new FormData();
  //   for (const key in data) {
  //     formData.append(key, data[key]);
  //   }
  //   if (file) {
  //     formData.append('file', file, file.name); // Use a meaningful key for the file
  //   }
  //   const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });  
  //   return this.http.post<any>(url, formData, { headers })
  //     .pipe(catchError(this.handleError));
  // }
  

  private postRequestWithMedia(url: string, data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      // .set('Authorization', 'Bearer your_token_here') // Replace with your actual authentication token
      // .set('Access-Control-Allow-Origin', '*');
    return this.http.post<any>(url, data, { headers, observe: 'body', responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  private getRequest(url: string, params?: HttpParams): Observable<any> {
    const headers = new HttpHeaders()
      // .set('Authorization', 'Bearer your_token_here') // Replace with your actual authentication token
      // .set('Access-Control-Allow-Origin', '*');
    return this.http.get<any>(url, { headers, params, observe: 'body', responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status) {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getTrendings(): Observable<any> {
    const url = `${CONFIG.apiUrl}/trending/get_trending`;
    return this.getRequest(url);
  }

  getProperties(): Observable<propertyInterface[]> {
    const url = `${CONFIG.apiUrl}/property`;
    return this.getRequest(url);
  }

  createProperty(property: FormData): Observable<any> {
    const url = `${CONFIG.apiUrl}/property`;
    return this.postRequestWithMedia(url, property);
  }

  getSoldProperties(): Observable<propertyInterface[]> {
    const url = `${CONFIG.apiUrl}/property/property-sold`;
    return this.getRequest(url);
  }

  getPaidProperties(): Observable<propertyInterface[]> {
    const url = `${CONFIG.apiUrl}/property/property-paid`;
    return this.getRequest(url);
  }

  propertySearch(queries: any): Observable<propertyInterface[]> {
    const url = `${CONFIG.apiUrl}/property/search`;
    const params = new HttpParams({ fromObject: queries });
    return this.getRequest(url, params);
  }

  getAuthUserProperty(): Observable<propertyInterface[]> {
    const url = `${CONFIG.apiUrl}/property/user`;
    return this.getRequest(url);
  }

  getUserProperties(userId: string): Observable<propertyInterface[]> {
    const url = `${CONFIG.apiUrl}/property/user/${userId}`;
    return this.getRequest(url);
  }

  getUserSaveProperties(): Observable<propertyInterface[]> {
    const url = `${CONFIG.apiUrl}/property/wishlist`;
    return this.getRequest(url);
  }

  saveProperty(propertyId: string): Observable<any> {
    const url = `${CONFIG.apiUrl}/property/wishlist/${propertyId}`;
    return this.postRequest(url, {});
  }

  getPropertyById(id: string): Observable<propertyInterface> {
    const url = `${CONFIG.apiUrl}/property/${id}`;
    return this.getRequest(url);
  }

  updateProperty(id: string, updatedProperty: propertyInterface): Observable<any> {
    const url = `${CONFIG.apiUrl}/property/${id}`;
    return this.postRequest(url, updatedProperty);
  }

  deleteProperty(id: string): Observable<any> {
    const url = `${CONFIG.apiUrl}/property/${id}`;
    return this.http.delete(url, { observe: 'body', responseType: 'json' })
      .pipe(catchError(this.handleError));
  }
}

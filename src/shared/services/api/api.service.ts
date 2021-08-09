import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorizationType } from 'src/shared/constants/authorization-type';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private getHeaders(authorizationType: AuthorizationType, isFormData: Boolean = false): HttpHeaders {

    const isUserDataExisted = localStorage.hasOwnProperty('userData');
    const user = isUserDataExisted ? JSON.parse(localStorage.getItem('userData')!) : null;
    let headersConfig : any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if(isFormData){
      delete headersConfig['Content-Type'];
      delete headersConfig['application/json'];
    }

    if (authorizationType === AuthorizationType.BASIC && user !== null) {
      headersConfig['Authorization'] = `Basic ${user.token}`;
    }

    if (authorizationType === AuthorizationType.BEARER) {
      headersConfig['Authorization'] = `Bearer ${user.token}`;
    }

    //for test
    headersConfig['apikey'] = `YXBpa2V5OmVwaS1hcGkxMjM`;

    /* console.log(headersConfig); */
    return new HttpHeaders(headersConfig);
  }

  private catchError(error: any) {
    if(error?.error?.message){
      return throwError(error.error.message);
    }
    
    return throwError(error.statusText);
  }

  get(path: string, authorizationType: AuthorizationType, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.baseURL}${path}`,  {
      headers: this.getHeaders(authorizationType),
      params: params,
    }).pipe(catchError(this.catchError.bind(this)));
  }

  getWithbaseURL(baseUrl: string, path: string, authorizationType: AuthorizationType, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${baseUrl}${path}`,  {
      headers: this.getHeaders(authorizationType),
      params: params,
    }).pipe(catchError(this.catchError.bind(this)));
  }

  post(path: string, authorizationType: AuthorizationType, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.baseURL}${path}`,
      authorizationType !== AuthorizationType.BEARER ? JSON.stringify(body) : body,
      {headers: this.getHeaders(authorizationType, body instanceof FormData)},
    ).pipe(catchError(this.catchError.bind(this)));
  }

  put(path: string, authorizationType: AuthorizationType, body: Object = {},
      params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put(
      `${environment.baseURL}${path}?` + params.toString(),
      authorizationType !== AuthorizationType.BEARER ? JSON.stringify(body) : body,
      {headers: this.getHeaders(authorizationType, body instanceof FormData), params: params},
    ).pipe(catchError(this.catchError.bind(this)));
  }

  patch(path: string, authorizationType: AuthorizationType, body: Object = {},
    params: HttpParams = new HttpParams()): Observable<any> {
  return this.http.patch(
    `${environment.baseURL}${path}?` + params.toString(),
    authorizationType !== AuthorizationType.BEARER ? JSON.stringify(body) : body,
    {headers: this.getHeaders(authorizationType, body instanceof FormData), params: params},
  ).pipe(catchError(this.catchError.bind(this)));
}

  delete(path: string, authorizationType: AuthorizationType): Observable<any> {
  return this.http.delete(
    `${environment.baseURL}${path}`,
    {headers: this.getHeaders(authorizationType)},
  ).pipe(catchError(this.catchError.bind(this)));
}

  putWithbaseURL(baseUrl: string, path: string, authorizationType: AuthorizationType, body: Object = {},
                 params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put(
      `${baseUrl}${path}${params.toString()}?`,
      authorizationType !== AuthorizationType.BEARER ? JSON.stringify(body) : body,
      {headers: this.getHeaders(authorizationType, body instanceof FormData), params: params},
    ).pipe(catchError(this.catchError.bind(this)));
  }

  postWithbaseURL(baseUrl: string, path: string, authorizationType: AuthorizationType, body: Object = {},
      params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.post(
      `${baseUrl}${path}${params.toString()}?`,
      authorizationType !== AuthorizationType.BEARER ? JSON.stringify(body) : body,
      {headers: this.getHeaders(authorizationType, body instanceof FormData), params: params},
    ).pipe(catchError(this.catchError.bind(this)));
  }

  deleteWithbaseURL(baseUrl: string, path: string, authorizationType: AuthorizationType, body: Object = {},
      params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(
      `${baseUrl}${path}${params.toString()}?`,
      {headers: this.getHeaders(authorizationType, body instanceof FormData)},
    ).pipe(catchError(this.catchError.bind(this)));
  }
}

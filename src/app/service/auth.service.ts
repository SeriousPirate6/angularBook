import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const ApiUrl = 'http://localhost:8080/bookServer/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private options : HttpHeaders = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

  constructor(private http: HttpClient) { }

  login(datiForm : NgForm) : Observable<string>  {
    console.log(datiForm.value);
    let body = this.body(datiForm);
    return this.http.post(ApiUrl, body, {headers: this.options})
      .pipe(
        map((res : any) => {
          if (res['token']){
            this.setSession(res['token']);
          }
          return res['token'];
        }),
        catchError(this.errorHandler)
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expired');
  }

  private setSession(jwt: string) {
    let expire: number = new Date().getTime() + 10000;
    localStorage.setItem('token', jwt);
    localStorage.setItem('expired', expire.toString());
  }

  notExpired() : boolean {
    if(localStorage.getItem('expired')) {
      //Il ! crea un oggetto se è null;
      let expire : number = parseInt(localStorage.getItem('expired')!);
      return new Date().getTime() < expire;
    }
    return false;
  }

  private body(df: NgForm) {
    //consente di passare dei parametri via URL, dati al server che ci consentono di acquisire il token;
    let params = new HttpParams()
      .set('username', df.value.username)
      .set('password', df.value.password);
    return params;
  }

  private errorHandler(error: any) {
    console.log(error);
    let msg : string | undefined;
    if(error instanceof HttpErrorResponse){
      if(error.status === 0) {
        msg = 'Application offline';
      } else {
        msg = `Something gone wrong: ${error.error.msg} (server status code ${error.status})`;
      }
      return throwError(msg);
    }
    return throwError(`An error occurred: ${error.message}`);
  }
}

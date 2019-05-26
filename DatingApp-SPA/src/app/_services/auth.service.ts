import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    console.log(model);
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          // console.log(this.decodedToken);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  sendSMS() {
 const apikey = 'x4bd1+7Lmao-SUk9RR5cHS3BxiJyl8k0W4hqhuL5v4';
 const address = 'http://api.txtlocal.com/send/?';
 const message = 'Hello from Namibia';
// tslint:disable-next-line: indent
	// message = Server.urlencode(message)
 const numbers = '264816939676';
 const sender = 'Ananias';
// tslint:disable-next-line: max-line-length
 const url = 'https://rest.nexmo.com/sms/json?api_key=8d071417&to=264816939676&text=Hello from Ananias Code&from=Ananias&api_secret=LPyDhxmheuVCgy1U';
 console.log(url);
    return this.http.get(url);
  }

}

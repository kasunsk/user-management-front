import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  headers = new Headers({"Content-Type": "application/json"});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }

  login(username: string, password: string) {

    return this.http.post(environment.api_url + '/auth/login', JSON.stringify({
      "username": username,
      "password": password
    }), this.options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let loginResponse = response.json();
        if (loginResponse && loginResponse.user && loginResponse.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(loginResponse.user));
        }

        if (loginResponse && loginResponse.tenant && loginResponse.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentTenant', JSON.stringify(loginResponse.tenant));
        }

        localStorage.setItem('userToken', JSON.stringify(loginResponse.token));
      });
  }


  logout() {

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentTenant');

    let user_token = localStorage.getItem('userToken');

    return this.http.get(environment.api_url + '/auth/logout', this.jwt()).map((response: Response) => {
      response.json();
      localStorage.removeItem('userToken');
    });
  }

  private jwt() {
    // create authorization header with jwt token
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    let headers = new Headers({'user_token': userToken, "Content-Type": "application/json"});
    return new RequestOptions({headers: headers});
  }
}

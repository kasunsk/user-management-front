import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  headers = new Headers({"Content-Type": "application/json"});
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {
  }

  login(username: string, password: string) {

    return this.http.post('http://localhost:8080/auth/login', JSON.stringify({
      "username": username,
      "password": password
    }), this.options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}

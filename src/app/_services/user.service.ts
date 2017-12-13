import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

import {User} from '../_models/index';
import {environment} from "../../environments/environment";

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get(environment.api_url + '/user/list', this.jwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get( environment.api_url + '/user/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post(environment.api_url + '/user', user, this.jwt()).map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put(environment.api_url + '/user/' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete(environment.api_url + '/user/' + id, this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let userToken = JSON.parse(localStorage.getItem('userToken'));
    let headers = new Headers({'user_token': userToken, "Content-Type": "application/json"});
    return new RequestOptions({headers: headers});
  }
}

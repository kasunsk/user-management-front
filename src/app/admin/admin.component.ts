import { Component, OnInit } from '@angular/core';

import { Tenant } from '../_models/index';
import { UserService } from '../_services/index';
import {User} from "../_models/user";

import { Router } from '@angular/router';

import { AlertService } from '../_services/index';


@Component({
  moduleId: module.id,
  templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {
  currentTenant: Tenant;
  users: User[] = [];
  model: any = {};
  user: User;
  loading = false;

  constructor(private userService: UserService, private alertService : AlertService, private router : Router) {
    this.currentTenant = JSON.parse(localStorage.getItem('currentTenant'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(users => { this.loadAllUsers() });
  }

  createUser(user: User) {
    this.loading = true;
    this.userService.create(this.model).subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        //this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
}

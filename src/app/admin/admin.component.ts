import { Component, OnInit } from '@angular/core';

import { Tenant } from '../_models/index';
import { UserService } from '../_services/index';
import {User} from "../_models/user";

@Component({
  moduleId: module.id,
  templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {
  currentTenant: Tenant;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentTenant = JSON.parse(localStorage.getItem('currentTenant'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
}

import { Component, OnInit } from '@angular/core';

import { Tenant } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {
  currentTenant: Tenant;
  tenants: Tenant[] = [];

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
    this.userService.getAll().subscribe(tenants => { this.tenants = tenants; });
  }
}

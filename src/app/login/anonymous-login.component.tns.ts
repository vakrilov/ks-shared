///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { Component, OnInit } from '@angular/core';

import { User } from '../core/models/user.model.tns';
import { UserService } from '../core/services/user.service.tns';
import { NavigationService } from '../core/services/navigation.service.tns';

@Component({
  moduleId: module.id,
  templateUrl: './anonymous-login.component.html'
})
export class AnonymousLoginComponent implements OnInit {
  constructor(private userService: UserService, private navigationService: NavigationService) {}

  ngOnInit(): void {
    const user = new User();
    user.password = '';
    user.username = '';

    this.userService.register(user).then(() => {
      this.navigationService.navigate(['/'], { clearHistory: true });
    });
  }
}

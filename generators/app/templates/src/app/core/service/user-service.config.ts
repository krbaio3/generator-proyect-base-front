import { Injectable, Optional } from '@angular/core';

@Injectable()
export class UserServiceConfig {
  private userName = '';

  constructor(_userName: string) {
    this.userName = _userName;
  }
  get userNameMethod() {
    return this.userName;
  }
}

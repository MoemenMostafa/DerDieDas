import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../../providers/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  async canActivate()  {
    const isFirstLaunch = await this.authService.isFirstLaunch();
    if (isFirstLaunch) {
      this.router.navigate(['intro']);
      return false;
    }
    return true;
  }

}

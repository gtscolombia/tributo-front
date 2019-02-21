import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { SavedataService } from './savedata.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private saveDataService: SavedataService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];

    if (this.saveDataService.isLogged()) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }
}
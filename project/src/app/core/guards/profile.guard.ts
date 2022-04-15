import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private gameSevice: GameService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  if(this.userIsLogged() && !!route.paramMap.get('id')){
    return new Observable((subscriber) => {
      this.gameSevice.loadGameById(route.paramMap.get('id')).subscribe(response => {
        if(response.owner.objectId === this.authService.getItem('userData')['objectId']){
          subscriber.next(true)
        };
      })
    });
  }else if(this.userIsLogged()){
    return true
  }

  this.router.navigate(['/home'])
  return false
  }

  userIsLogged(){
    return !!this.authService.getItem('userData');
  }

}

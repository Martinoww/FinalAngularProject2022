import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentChecked{

  isLogged$: Observable<boolean> = this.userService.isLogged$;
  isLoggingOut = false
  username: string;

  constructor(private userService: UserService, private route: Router, private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.username = this.authService.getItem('userData') == null ? '' : this.authService.getItem('userData')['username'];
  }

  ngAfterContentChecked(): void {
    this.username = this.authService.getItem('userData') == null ? '' : this.authService.getItem('userData')['username'];
    
  }

  handleLogOut(): void {
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;
    this.userService.logout$().subscribe({
      next: () => {
      },
      complete: () => {
        this.isLoggingOut = false;
        this.route.navigate(['/home']);
      },
      error: () => {
        this.isLoggingOut = false;
      }
    });
  }

}

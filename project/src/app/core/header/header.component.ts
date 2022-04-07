import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isLogged$: Observable<boolean> = this.userService.isLogged$;
  isLoggingOut = false

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
  }


  handleLogOut(): void {
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;
    console.log('logout called');

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

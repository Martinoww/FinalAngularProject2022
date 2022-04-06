import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges{

  isLogged:boolean = false

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.isLogged = !!this.authService.getItem('userData');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLogged = !!this.authService.getItem('userData');
    
  }

  handleLogOut(): void {
    this.authService.removeItem('userData')
    this.route.navigate(['/home'])
  }

}

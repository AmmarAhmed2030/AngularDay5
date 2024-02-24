import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isUserLogged!: boolean;
  constructor(private autService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.autService.getUserState().subscribe({
      next: (state) => {
        this.isUserLogged = state;
        console.log(state);
      },
    });
  }
  changeState() {
    if (this.isUserLogged) {
      this.autService.logout();
    } else {
      this.router.navigate(['/join/login']);
    }
  }
}

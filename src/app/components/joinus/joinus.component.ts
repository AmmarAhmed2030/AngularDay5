import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-joinus',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './joinus.component.html',
  styleUrl: './joinus.component.scss',
})
export class JoinusComponent {}

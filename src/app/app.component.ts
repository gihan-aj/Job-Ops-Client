import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './layout/navigation-bar/navigation-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'job-ops-client';

  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}

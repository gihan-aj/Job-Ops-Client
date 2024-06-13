import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './layout/navigation-bar/navigation-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PrimeNGConfig } from 'primeng/api';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'job-ops-management-client';

  constructor(
    private primengConfig: PrimeNGConfig,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    const jwt = this.accountService.getJwt();

    if (jwt) {
      this.accountService.refreshUser(jwt).subscribe({
        next: (_) => {},
        error: (_) => {
          this.accountService.logout();
        },
      });
    } else {
      this.accountService.refreshUser(null).subscribe();
    }
  }
}

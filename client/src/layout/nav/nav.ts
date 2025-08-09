import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected creds: any = {}
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toasterService = inject(ToastService);

  login() {
    this.accountService.login(this.creds).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
        console.log(response);
        this.toasterService.success('Logged In Successfully!');
        this.creds = {}
      },
      error: error => {
        this.toasterService.error(error.error);
      }
    });

  }

  logout() {
    this.router.navigateByUrl('/');
    this.accountService.logout();
    this.toasterService.success('Logged Out Successfully!');
  }
}


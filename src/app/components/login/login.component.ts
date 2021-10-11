import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faBan = faBan;
  faUser = faUser;
  faSignInAlt = faSignInAlt;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userAuth: User = new User;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.userAuth=this.tokenStorage.getUser();
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe((res: any) => {
      this.tokenStorage.saveToken(res.access_token);
      this.tokenStorage.saveUser(res.user);
      this.isLoggedIn = true;
      this.errorMessage = '';
      this.router.navigate(['profile/' + this.tokenStorage.getUser().id]);
    }, (error: any) => {
      this.isLoginFailed = true;
      this.errorMessage = error.error.message;
    });
  }

}

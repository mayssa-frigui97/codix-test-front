import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from './../../services/auth.service';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { CountryEnum } from 'src/app/enums/countryEnum';
import { UserService } from 'src/app/services/user.service';
import {Location} from '@angular/common';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  faPhone = faPhone;
  faMapMarker = faMapMarker;
  faEnvelope = faEnvelope;
  faPenSquare = faPenSquare;
  faLock = faLock;
  faSignOutAlt = faSignOutAlt;

  validatingForm!: FormGroup;
  errorMessage = '';

  currentUser: User = new User;
  countries: CountryEnum[] = [];

  constructor(private tokenStorage: TokenStorageService,
    private userService : UserService,
    private location: Location) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
    this.getCountries();
  }

  getCountries(): void {
    this.userService.getCountries()
    .subscribe(countries => this.countries = countries);
  }

  enregistrer(user: User)
  {
    this.userService.updateUser(user).subscribe(
      (res) => {
        this.errorMessage = '';
      },
      (error: any) => {
        this.errorMessage = error.error.message;
      });
  }

  retour(){
    this.location.back();
  }

  logout(){
    this.tokenStorage.logout();
  }

}

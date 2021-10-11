import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryEnum } from 'src/app/enums/countryEnum';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../models/user';
import { NgForm } from '@angular/forms';
import { faBan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faBan = faBan;
  public countries: CountryEnum[] = [];
  errorMessage='';
  public users: User[] = [];
  constructor(private userService : UserService,
    private router : Router) { }

  ngOnInit(): void {
    this.getCountries();
    this.getUsers();
  }

  getCountries(): void {
    this.userService.getCountries()
    .subscribe(countries => this.countries = countries);
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  addUser(formulaire: NgForm):void{
    const credentials = {
      nickname: formulaire.value.nickname,
      password: formulaire.value.password,
      confirmPassword: formulaire.value.confirmPassword,
      email: formulaire.value.email,
      phone: formulaire.value.phone,
      country: formulaire.value.country
    }

    this.userService.addUser(credentials).subscribe(
      () => {
        this.router.navigate(['login']);
        this.errorMessage = "";
      },
      (error) => {
        this.errorMessage = error.error.message;
        console.log(error);
      }
    );
  }

}

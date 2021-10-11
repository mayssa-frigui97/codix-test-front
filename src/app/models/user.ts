import { CountryEnum } from "../enums/countryEnum";

export class User {

  public id!: number;

  public nickname!: string;

  public password!: string;

  public confirmPassword!: string;

  public email!: string;

  public phone!: number;

  public country!: CountryEnum;

}

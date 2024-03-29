export default class RegisterFormData {
  private readonly _formData: FormData;
  private _email?: string;
  private _password?: string;
  private _firstName?: string;
  private _lastName?: string;
  constructor(form?: HTMLFormElement) {
    this._formData = new FormData(form);
    this.populateData(this._formData);
  }

  public isValid(): boolean {
    return Boolean(this._email) && Boolean(this._password);
  }

  public toString(): string {
    return JSON.stringify({
      email: this._email,
      password: this._password,
      firstName: this._firstName,
      lastName: this._lastName,
    });
  }

  private populateData(form: FormData): void {
    this._email = form.get("email") as string;
    this._password = form.get("password") as string;
    this._firstName = form.get("firstName") as string;
    this._lastName = form.get("lastName") as string;
  }
}

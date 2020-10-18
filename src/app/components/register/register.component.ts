import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

export class EmailErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  passMatch = true;
  matcher2 = new EmailErrorStateMatcher();

  constructor(private router: Router,
              private authService: AuthService,
              private snackbarService: SnackbarService,
              public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.router.navigate(['login']);
  }

  async onSubmit() {
    try {
      const formData = this.registerForm.getRawValue();
      this.loading = true;
      await this.authService.register(formData.email, formData.username, formData.password);
      await this.authService.login({ email: formData.email, password: formData.password});
      this.router.navigate(['home']);
    } catch (err) {
      if (err.error.email) {
        this.snackbarService.showError(err.error.email);
      } else {
        console.log(err);
      }
    } finally {
      this.loading = false;
    }
  }
}

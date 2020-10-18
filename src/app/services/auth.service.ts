
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line: variable-name
  public _user = null;
  // tslint:disable-next-line: variable-name
  public _token = null;
 // tslint:disable-next-line: variable-name
  public _username = null;

  url = environment.apiUrl;

  userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  sendEmail = false;

  get user() {
    return this._user;
  }
  get token() {
    return this._token;
  }

  get username() {
    return this._username;
  }

  constructor(public firebaseAuth: AngularFireAuth, private http: HttpClient) {
    this.firebaseAuth.user.subscribe(async user => {
      this._user = user;
      this.userSubject.next(user);
      const idTokenResult = await user.getIdTokenResult();
      this._username = idTokenResult.claims.username;
    });
  }

  currentUserEmailVerified() {
    if (this.user) {
      return this.user.emailVerified;
    }
    return false;
  }

  async resendEmail() {
    if (this._user) {
      return this._user.sendEmailVerification();
    }
  }

  async login({ email, password }: { email: string; password: string; }): Promise<any> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, username: string, password: string): Promise<any> {
    this.sendEmail = true;
    return this.http.post(`${ this.url }/signup`, { email, username, password }).toPromise();
  }

  async updateCustomClaims() {
    return this._user.getIdToken(true);
  }

  async sendPasswordResetEmail(email: string) {
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }

  async sendVerificationEmail(email: string, password: string) {
    await this.login({ email, password });
    return this.user.sendEmailVerification();
  }

  logout() {
    return this.firebaseAuth.signOut();
  }
}

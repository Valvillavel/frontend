import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {userData: any; // Save logged in user data
public authToken: string;
userRole:any;

private authApiBase: string = 'http://localhost:1337';
private currentUserSubject: BehaviorSubject<any>;
public currentUser: Observable<any>;

constructor(
  private httpClient: HttpClient,
  public ngZone:NgZone,
  public router: Router, 
) { 
  this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
  this.currentUser = this.currentUserSubject.asObservable();

  if (sessionStorage.getItem('currentUser')) {
    this.userData = JSON.parse(sessionStorage.getItem('currentUser'));
    this.authToken = sessionStorage.getItem('currentJwt');
  }    
}
login(username, password) {
  console.log(username)
  return this.httpClient.post<any>(`${this.authApiBase}/auth/local`, { identifier: username, password: password })
    .pipe(map(response => {
      console.log(response)
        // login successful if there's a jwt token in the response
        if (response.jwt && response.user && response.user.blocked == false) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(response.user));
            sessionStorage.setItem('currentJwt', response.jwt);
            this.userData = response.user;
            this.userRole=this.userData.role.name;
            console.log(this.userRole)
            this.authToken = sessionStorage.getItem('currentJwt');
            this.currentUserSubject.next(response.user);
        }
        return response.user;
    }));

}
get isLoggedIn(): boolean {
  const user = JSON.parse(sessionStorage.getItem('currentUser'));
  return (user !== null && user.emailVerified !== false) ? true : false;
}

logout() {
  // remove user from local storage to log user out
  sessionStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentJwt');
  this.currentUserSubject.next(null);

}
getCurrentUser(){
  console.log(this.userData)
  return this.userData;
}
getRole(){
  this.userRole=this.userData.role.name;
  return this.userRole;
}

}

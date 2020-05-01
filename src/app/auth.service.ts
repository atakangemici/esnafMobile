import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 public userCheck : boolean;
  constructor(
    public ngZone: NgZone,
    public http : HttpClient,
    public route : Router
  ) {  
    this.userCheck = false;
  }

  Login(user){
    this.http.post<any>('https://localhost:44383/api/app/login', user.form.value).subscribe(data => {
      var user = data;
      localStorage.setItem('user', JSON.stringify(user));
      this.route.navigateByUrl("/tabs/tab3");
      this.userCheck = true;
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }
  
}
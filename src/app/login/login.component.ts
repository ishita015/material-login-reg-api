import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { login } from '../models/login';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  log_Obj: login
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required)
  })

  constructor(private router: Router, private auth:AuthService, private newService: DataService, private http: HttpClient) { }

  ngOnInit() {
  }
  register() {
    this.router.navigate(['/reg']);
  }
  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.value.email === undefined || this.loginForm.value.email === '' ||
      this.loginForm.value.companyName === undefined || this.loginForm.value.companyName === '') {
      alert("if");
    }
    else {
      alert("else");
      this.newService.loginUser(this.loginForm.value).subscribe((resultArray: any) => {
        console.log("XXXXXXXXXX xxXXXXXXXXXXXXXXXXXX", resultArray);
        this.log_Obj = resultArray;
        const token = localStorage.setItem('token', JSON.stringify(resultArray.token));
        this.router.navigate(['/dashboard']);
      })
    }
  }
}

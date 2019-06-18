import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../data.service';
import { reg } from './../models/reg';
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {
  reg_Obj: reg;
  registerForm = new FormGroup({
    companyName: new FormControl(''),
    price: new FormControl(''),
    email: new FormControl(''),
    image: new FormControl('')
  });

  constructor(private router: Router, private http: HttpClient, private newService: DataService) { }

  ngOnInit() { }
  onSubmit() {
    alert(1);
    if (this.registerForm.value.companyName == undefined || this.registerForm.value.companyName == '' ||
      this.registerForm.value.price == undefined || this.registerForm.value.price == '' ||
      this.registerForm.value.email == undefined || this.registerForm.value.email == '' ||
      this.registerForm.value.image == undefined || this.registerForm.value.image == '') {
      alert(2)
    }
    else {
      console.log(this.registerForm.value);
      this.newService.registerUser(this.registerForm.value).subscribe(resultArray => {
        this.reg_Obj = resultArray;
        console.log(this.reg_Obj)
        this.router.navigate(['/'])
      })
    }
  }
}

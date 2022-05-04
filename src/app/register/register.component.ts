import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../login/model/user';
import { UserService } from '../login/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  passwordLength = false;
  userRequest: User = new User;
  alert: Boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {

    if (this.form.value['fullName'] == ''
      || this.form.value['email'] == '' || this.form.value['username'] == ''
      || this.form.value['password'] == '') {
      this.submitted = true;
      console.log(this.form.value['password'].length)
    } else if (this.form.value['password'].length < 8) {
      this.passwordLength = true;
    } else {
      this.submitted = false;
      this.passwordLength = false;
      this.userRequest.nickname = this.form.value['username'];
      this.userRequest.password = this.form.value['password'];
      this.userRequest.email = this.form.value['email']
      this.userRequest.isAdmin = false;
      console.log('isia')
      this.userService.saveNewUser(this.userRequest).subscribe(user => {
        this.alert = true;
        this.form.reset();
        setTimeout(() => {
          this.onTimeOut();
        }, 1500);
        console.log(user.email);
      });
    }
  }

  onTimeOut() {
    this.router.navigate(["login"]);
  }
  closeAlert() {
    this.alert = false;
  }

}

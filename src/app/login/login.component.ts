import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './model/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  userLogin: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }



  onSubmit() {
    this.userService.login(this.form.value['username']).subscribe((data: User) => {
      if (data.email) {
        console.log("navegaS")
        this.router.navigate(["products/" + data.isAdmin]);

      }
    });

  }

  registerUser() {
    this.router.navigate(["register"]);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './login/model/user';
import { UserService } from './login/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hulk-store-ng';

  textLabel: Boolean = true;

  constructor(private router: Router) {
      
  }
  goFormSingIn() {
    this.router.navigate(["login/"]);
    this.textLabel = false;
  }
}

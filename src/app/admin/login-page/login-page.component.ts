import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  form: FormGroup = new FormGroup<any>({});
  loading: boolean = false;
  message: string = '';


  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = "Please log in first!"
      } else if (params['authFailed']) {
        this.message = "Token has expired, please login again!"
      }
    });
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    const user: User = {...this.form.value};
    this.authService.login(user).subscribe((res) => {
      this.loading = false;
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
    }, () => {
      this.loading = false;
    });
  }
}

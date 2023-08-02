import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  loginForm: FormGroup;
  username: string;
  password: string;
  user: User;

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
    this.authService.message$.subscribe(data=>{
      this.message = data;
    })
  }

  onFormSubmit(){
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.authService.login(this.username,this.password).subscribe({
      next : (data)=>{
        //console.log(data);
        this.user = data;
        localStorage.setItem('username', this.user.username);
        localStorage.setItem('credentials', btoa(this.username + ':' + this.password));
        localStorage.setItem('id', String(this.user.userId));
        localStorage.setItem('role', this.user.role);
        this.authService.username$.next(this.user.username);
        this.authService.credentials$.next(btoa(this.username + ':' + this.password));
        this.authService.id$.next(String(this.user.id));
        this.router.navigateByUrl('/');
      },
      error: (e)=> {
        this.authService.message$.next("Invalid Credentials");
      }
    });
  }

}

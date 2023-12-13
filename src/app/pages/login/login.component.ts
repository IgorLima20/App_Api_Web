import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  logar() {
    if (this.formLogin.invalid) return;
    var usuario = this.formLogin.getRawValue() as User;
    this.userService.login(usuario).subscribe({
      error: (error) => {
        if (error.status !== 200) {
          this.snackBar.open('Falha na autenticação', 'Usuário ou senha incorretos.', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      }
    });
  }

}

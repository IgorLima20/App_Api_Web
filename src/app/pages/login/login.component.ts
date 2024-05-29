import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
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
          Swal.fire({
            title: "Falha na autenticação!",
            text: "Usuário ou senha incorretos.",
            icon: "error"
          });
        }
      }
    });
  }

}

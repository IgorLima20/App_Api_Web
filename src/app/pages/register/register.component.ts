import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  register() {
    if (this.formRegister.invalid) return;
    var usuario = this.formRegister.getRawValue() as User;
    this.userService.register(usuario).subscribe({
      next: (next: any) => {
        if (next.status = 201) {
          Swal.fire({
            title: "Sucesso!",
            text: "Usuário cadastrado com sucesso.",
            icon: "success"
          });
          this.router.navigate(['login']);
        }
      },
      error: (error) => {
        if (error.status !== 200) {
          Swal.fire({
            title: "Falha no cadastro!",
            text: error.error.error,
            icon: "error"
          });
        }
      }
    });
  }

}

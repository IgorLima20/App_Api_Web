import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryData } from 'src/app/interfaces/CategoryData';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie-cad',
  templateUrl: './categorie-cad.component.html',
  styleUrls: ['./categorie-cad.component.scss']
})
export class CategorieCadComponent implements OnInit {

  modalService = inject(NgbActiveModal);

  @Input() title: string = '';
  @Input() categoryData: CategoryData | null = null;
  categorieForm!: FormGroup;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categorieForm = new FormGroup({
      id: new FormControl(this.categoryData ? this.categoryData.id : ''),
      category: new FormControl(this.categoryData ? this.categoryData.category : '', [Validators.required])
    });
  }

  get category() {
    return this.categorieForm.get('category')!;
  }

  submit() {
    if (this.categorieForm.get('id')?.value) {
      this.categoryService.edit(this.categorieForm.getRawValue()).subscribe({
        next: (next) => {
          console.log(next);
          this.modalService.close(true);
        },
        error: (error) => {
          Swal.fire({
            title: "Falha na edição!",
            text: error.error.error,
            icon: "error"
          });
        }
      });
    } else {
      this.categoryService.create(this.categorieForm.getRawValue()).subscribe({
        next: (next) => {
          console.log(next);
          this.modalService.close(true);
        },
        error: (error) => {
          Swal.fire({
            title: "Falha na criação!",
            text: error.error.error,
            icon: "error"
          });
        }
      });
    }
  }

}

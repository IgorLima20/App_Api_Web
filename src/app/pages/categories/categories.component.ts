import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CategorieCadComponent } from 'src/app/components/categorie-cad/categorie-cad.component';
import { CategoryData } from 'src/app/interfaces/CategoryData';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  page = 0;
	pageSize = 4;
  collectionSize = 0;

  modalService = inject(NgbModal);

  columns: string[] = ['#', 'Categoria', ''];
  categories: CategoryData[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.carregaCategorias();
    })
  }

  carregaCategorias() {
    console.log(this.page);
    console.log(this.pageSize);
    this.categoryService.getDataPage(this.page, this.pageSize).subscribe({
      next: (result) => {
        console.log(result);
        this.categories = result.content;
        this.collectionSize = result.totalElements;
      },
      error: (error) => {
        if (error.status !== 200) {
          Swal.fire({
            title: "Falha no carregamento!",
            text: "Não foi possível carregar as categorias.",
            icon: "error"
          });
        }
      }
    });
  }

  create() {
    const modalRef = this.modalService.open(CategorieCadComponent)
    modalRef.result.then(
      (result) => {
        if (result) {
          this.carregaCategorias();
        }
      },
    );
    modalRef.componentInstance.title = 'Criar Categoria';
  }

  edit(category: CategoryData) {
    const modalRef = this.modalService.open(CategorieCadComponent)
    modalRef.result.then(
      (result) => {
        if (result) {
          this.carregaCategorias();
        }
      },
    );
    modalRef.componentInstance.title = 'Editar Categoria';
    modalRef.componentInstance.categoryData = category;
  }

  delete(id: number) {
    Swal.fire({
      title: "Deseja realmente excluir essa categoria?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Excluir",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              title: "Sucesso!",
              text: "Categoria exclúida com sucesso.",
              icon: "success"
            });
            this.carregaCategorias();
          },
          error: (error: any) => {
            console.log(error);
            if (error.status !== 200) {
              Swal.fire({
                title: "Falha na exclusão!",
                text: error.error.error,
                icon: "error"
              });
            }
          }
        });
      }
    });
  }

}

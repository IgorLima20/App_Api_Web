import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryData } from 'src/app/interfaces/CategoryData';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  columns: string[] = ['#', 'Categoria'];
  categories: CategoryData[] = [];

  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.carregaCategorias();
  }

  carregaCategorias() {
    this.categoryService.getData().subscribe({
      next: (next) => {
        this.categories = next;
      },
      error: (error) => {
        if (error.status !== 200) {
          this.snackBar.open('Falha no carregamento', 'Não foi possível carregar as categorias.', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private categoryService : CategoryService
  ) {}

  categories: any;

  ngOnInit(): void {
    this.categoryService.categories.subscribe((categories) => {
      this.categories = categories;
    });
    this.categoryService.queryCategories();
  }
}

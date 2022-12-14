import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-category-create-form',
  templateUrl: './category-create-form.component.html',
  styleUrls: ['./category-create-form.component.scss']
})
export class CategoryCreateFormComponent implements OnInit {

  title = 'category-create-form';
  categoriesSelect: Array<any> = []
  selectItem: any
  selectedItem: any

  categoryForm = this.fb.group({
    todoText: ['', Validators.required],
    categoryTitle: ['', Validators.required],
    categorySelectItem: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<CategoryCreateFormComponent>,
    private categoryService : CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategoryTitle();
    this.categoryService.queryCategories();
  }
  private getCategoryTitle(): void {
    this.categoryService.categories.subscribe((listTitle) =>{
      this.categoriesSelect = [...listTitle, {
        title:"Новая категория" ,
        id:""
      }]
    })
  }
  changeCategory(id: any) {
    const categorySelectItem = this.categoryForm.get('categorySelectItem');
    const categoryTitle = this.categoryForm.get('categoryTitle');

    const categorySelectValidators: ValidatorFn[] = [
      Validators.required,
    ];

    if (id == "") {
      categoryTitle?.setValidators(categorySelectValidators);
    } else {
      categoryTitle?.clearValidators();
    }

    categoryTitle?.updateValueAndValidity();
  }
  async onSubmit(): Promise<void> {

    let text = this.categoryForm.value.todoText;
    let categoryId = this.categoryForm.value.categorySelectItem;
    let categoryName = this.categoryForm.value.categoryTitle;

    if(categoryId == "") {
      await this.createCategory(categoryName, text);
      return;
    }
    await this.createTodo(text, categoryId);
  }
  private createCategory(categoryName: string, text: string) : void {
    let queryRequest =
    `
      mutation {
        addCategory (categoryArgs: {
          categoryName: "${categoryName}"
          text: "${text}"
        }) {
          id,
          title,
        }
      }
    `
    this.categoryService.mutationCategories(queryRequest);
    this.dialogRef.close();
  }
  createTodo(text: string, categoryId: string) : void {
    let queryRequest =
    `
      mutation {
        addTodo (todoArgs: {
          text: "${text}"
          categoryId: "${categoryId}"
        }) {
          id,
          isCompleted,
          text,
          categoryId
        }
      }
    `

    this.categoryService.mutationCategories(queryRequest);
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryCreateFormComponent } from '../categories/category-create-form/category-create-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService,
  ) {}

  openDialogCategoryCreateFrom(): void {
    const dialogRef = this.dialog.open(CategoryCreateFormComponent, {
      width: '400px',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.categoryService.queryCategories();
    // });
  }
}

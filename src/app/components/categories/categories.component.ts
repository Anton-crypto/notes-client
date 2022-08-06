import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private apollo: Apollo) {}
  categories: Array<any> = []

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        {
          getCategories {
            id
            title
            todos {
              id
              text
              isCompleted
            }
          }
        }
      `,
    }).valueChanges.subscribe((result: any) => {
      this.categories = result.data.getCategories;
      console.log(this.categories)
    });
  }
}

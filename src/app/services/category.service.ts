import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import { Type, Transform, classToPlain } from 'class-transformer';
import { Category } from '../models/category.model';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  categories: Subject<any> = new Subject<any>();

  constructor(
    private apollo: Apollo
  ) {}

  queryCategories() : any {
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
      this.categories.next(plainToClass(Category, result.data.getCategories));
    });
  }
  mutationCategories(queryRequest: any) : void {
    this.apollo.mutate({
      mutation: gql`${queryRequest}`,
    }).subscribe(() => {
      this.queryCategories();
    });
  }
}

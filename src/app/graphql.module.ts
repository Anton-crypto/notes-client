import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';



@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache({
            typePolicies: {
              Category: {
                keyFields: ["id"],
              },
            }
          }),
          link: httpLink.create({
            uri: 'https://notes-back-api.herokuapp.com/graphql',
          }),
          defaultOptions : {
            watchQuery: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'ignore',
            },
            query: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'all',
            },
          }
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

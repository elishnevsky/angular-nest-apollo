import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'asgl-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: any[];

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          query {
            authors {
              id
              name
              books {
                id
                title
              }
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        this.authors = (result.data as any).authors;
      });
  }
}

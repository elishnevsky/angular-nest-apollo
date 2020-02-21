import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Author, AllBooksGql, LikeBookGql, Book } from '../graphql';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'asgl-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors$: Observable<Author[]>;

  constructor(
    private allBooksGql: AllBooksGql,
    private likeBookGql: LikeBookGql,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.authors$ = this.allBooksGql.watch().valueChanges.pipe(
      map(result => result.data.authors)
    );
  }

  likeBook(book: Book) {
    this.likeBookGql.mutate({
      bookId: +book.id // doesn't work with just book.id
    })
    .subscribe();

    // this.apollo.mutate({
    //   mutation: gql`
    //     mutation likeBook($bookId: Int!) {
    //       likeBook(id: $bookId) {
    //         id
    //         title
    //         likes
    //       }
    //     }
    //   `,
    //   variables: {
    //     bookId: +book.id
    //   },
    //   optimisticResponse: {
    //     __typename: 'Mutation',
    //     likeBook: {
    //       __typename: 'Book',
    //       ...book,
    //       likes: book.likes + 1
    //     }
    //   }
    // })
    // .subscribe();
  }
}

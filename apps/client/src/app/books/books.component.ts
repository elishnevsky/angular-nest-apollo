import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AllBooksGql, LikeBookGql, Book } from '../graphql';

@Component({
  selector: 'asgl-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(
    private allBooksGql: AllBooksGql,
    private likeBookGql: LikeBookGql
  ) { }

  ngOnInit() {
    this.books$ = this.allBooksGql.watch().valueChanges.pipe(
      map(result => result.data.books)
    );
  }

  likeBook(book: Book) {
    this.likeBookGql.mutate({
      bookId: +book.id // doesn't work with just book.id
    }
    // , {
    //   optimisticResponse: {
    //     __typename: 'Mutation',
    //     likeBook: {
    //       __typename: 'Book',
    //       ...book,
    //       likes: book.likes + 1
    //     }
    //   }
    // }
    )
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

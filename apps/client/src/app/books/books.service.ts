import { Injectable } from '@angular/core';
import { Query, Mutation, Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  authorId: number;
  author: Author;
  likes: number;
}

export interface Author {
  id: number;
  name: string;
  books: Book[]
}

export interface Response {
  books: Book[]
}

const ALL_BOOKS = gql`
  query allBooks {
    books {
      id
      title
      likes
      author {
        name
      }
    }
  }
`;

const LIKE_BOOK = gql`
  mutation likeBook($bookId: Int!) {
    likeBook(id: $bookId) {
      id
      title
      likes
    }
  }
`;

@Injectable()
export class BooksService {
  private _books$ = new BehaviorSubject<Book[]>([]);
  books$ = this._books$.asObservable();

  private _loading$ = new BehaviorSubject<boolean>(true);
  loading$ = this._loading$.asObservable();

  private allBooksQueryRef: QueryRef<Response>;

  constructor(private apollo: Apollo) {
    this.allBooksQueryRef = this.apollo.watchQuery<Response>({
      query: ALL_BOOKS
    });
  }

  getAllBooks() {
    return this.allBooksQueryRef.valueChanges.subscribe(result => {
      this._books$.next(result.data.books);
      this._loading$.next(result.loading);
    });
  }

  likeBook(book: Book) {
    return this.apollo.mutate({
      mutation: LIKE_BOOK,
      variables: {
        bookId: +book.id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeBook: {
          __typename: 'Book',
          ...book,
          likes: book.likes + 1
        }
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { Query, Mutation, Subscription } from 'apollo-angular';
import gql from 'graphql-tag';

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

@Injectable({ providedIn: 'root' })
export class AllBooksGql extends Query<Response> {
  document = gql`
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
}

@Injectable({ providedIn: 'root' })
export class LikeBookGql extends Mutation<Book> {
  document = gql`
    mutation likeBook($bookId: Int!) {
      likeBook(id: $bookId) {
        id
        title
        likes
      }
    }
  `;
}

@Injectable({ providedIn: 'root' })
export class BookLikedGql extends Subscription<Book> {
  document = gql`
    subscription bookLiked {
      bookLiked {
        id
        title
        likes
      }
    }
  `;
}

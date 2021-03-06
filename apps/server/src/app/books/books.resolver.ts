import { Query, Resolver, Args, ResolveProperty, Parent, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { books, authors } from '../data';
import { Book, Author } from './models';
import { Int } from 'type-graphql';

const pubSub = new PubSub();

@Resolver(of => Book)
export class BooksResolver {
  @Query(returns => [Book], { name: 'books' })
  getBooks() {
    return books;
  }

  @Query(returns => Book, { name: 'book' })
  getBookById(@Args({ name: 'id', type: () => Int }) id: number) {
    return books.find(b => b.id === id);
  }

  @Mutation(returns => Book)
  likeBook(@Args({ name: 'id', type: () => Int }) id: number) {
    const book = this.getBookById(id)
    // if (Math.random() >= 0.5)
      book.likes += 1;
    pubSub.publish('BOOK_LIKED', { bookLiked: book });
    return book;
  }

  @ResolveProperty('author', returns => Author)
  getAuthor(@Parent() book: any) {
    return authors.find(a => a.id === book.authorId);
  }

  @Subscription(returns => Book)
  bookLiked() {
    return pubSub.asyncIterator('BOOK_LIKED');
  }
}

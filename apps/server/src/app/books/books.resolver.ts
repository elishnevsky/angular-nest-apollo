import { Query, Resolver, Args, ResolveProperty, Parent, Mutation } from "@nestjs/graphql";
import { books, authors } from '../data';
import { Book, Author } from './models';
import { Int } from 'type-graphql';

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
    book.likes += 1;
    return book;
  }

  @ResolveProperty('author', returns => Author)
  getAuthor(@Parent() book: any) {
    return authors.find(a => a.id === book.authorId);
  }
}

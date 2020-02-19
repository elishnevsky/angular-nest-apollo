import { Query, Resolver, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { books, authors } from '../data';
import { Book, Author } from './models';

@Resolver(of => Book)
export class BooksResolver {
  @Query(returns => [Book], { name: 'books' })
  getBooks() {
    return books;
  }

  @Query(returns => Book, { name: 'book' })
  getBookById(@Args('id') id: number) {
    return books.find(b => b.id === id);
  }

  @ResolveProperty('author', returns => Author)
  getAuthor(@Parent() book: any) {
    return authors.find(a => a.id === book.authorId);
  }
}

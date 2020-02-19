import { Query, Resolver, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { books, authors } from '../data';
import { Author, Book } from './models';

@Resolver(of => Author)
export class AuthorsResolver {
  @Query(returns => [Author], { name: 'authors' })
  authors() {
    return authors;
  }

  @Query(returns => Author, { name: 'author' })
  author(@Args('id') id: number) {
    return authors.find(b => b.id === id);
  }

  @ResolveProperty('books', returns => [Book])
  books(@Parent() author: any) {
    return books.filter(b => b.authorId === author.id);
  }
}

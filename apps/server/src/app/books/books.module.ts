import { Module } from '@nestjs/common';
import { BooksResolver } from './books.resolver';
import { AuthorsResolver } from './authors.resolver';

@Module({
  providers: [BooksResolver, AuthorsResolver],
  exports: [BooksResolver, AuthorsResolver]
})
export class BooksModule { }

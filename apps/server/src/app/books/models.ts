import { ObjectType, Field, ID, Int } from 'type-graphql';

@ObjectType()
export class Author {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field(type => [Book])
  books: Book[]
}

@ObjectType()
export class Book {
  @Field(type => ID)
  id: number;

  @Field()
  title: string;

  @Field(type => Int)
  authorId: number;

  @Field(type => Author)
  author: Author;
}

import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Author, AllBooksGql, LikeBookGql } from '../graphql';

@Component({
  selector: 'asgl-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors$: Observable<Author[]>;

  constructor(private allBooksGql: AllBooksGql, private likeBookGql: LikeBookGql) { }

  ngOnInit() {
    this.authors$ = this.allBooksGql.watch().valueChanges.pipe(
      map(result => result.data.authors)
    );
  }

  likeBook(id: number) {
    this.likeBookGql.mutate({
      bookId: id
    })
    .subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { Book, BooksService } from './books.service';

@Component({
  selector: 'asgl-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BooksService]
})
export class BooksComponent implements OnInit {
  books$ = this.booksService.books$;
  loading$ = this.booksService.loading$;

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getAllBooks();
  }

  likeBook(book: Book) {
    this.booksService.likeBook(book).subscribe(({data}) => console.log(data));
    return false;
  }
}

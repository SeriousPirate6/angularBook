import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/model/book';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book',
  templateUrl: `book.component.html`,
  styles: [`
    .list-group-item{
      font-size: 0.75em;
    }
    .list-group-item.active {
      z-index: 2;
      color: #fff;
      background-color: darkorange;
      border-color: darkorange;
    }
    
    .search-book {
      max-width: 500px;
      padding-bottom: 10px;
      margin: auto;
      color: #405065;
    }

    .form-control {
      box-shadow: 0 10px 40px 0 #B0C1D9;
    }

    .form-control::placeholder {
      font-family: FontAwesome;
    }
  `]
})
export class BookComponent implements OnInit {

  books: Book[] = [];
  error: any;
  active?: Book;
  imageSrc?: String;
  p = 1;
  term = "";

  constructor(private http: HttpClient, private bookService: BookService) { }

  getAll() {
    this.bookService.getAll()
    .subscribe( (res: Book[]) => {
      this.books = res;
    },
    (error) => this.error = error
    );
  }

  delete(event: any, book: Book) {
    event.stopPropagation();
    // const index = this.books.indexOf(book);
    const index = this.books.findIndex(b => b.id === book.id);
    this.bookService.deleteBook(book)
      .subscribe(() => {
        this.books.splice(index, 1);
      },
      (error) => this.error = error
      );
  }

  setActive(book: Book) {
    this.active = book;
  }

  ngOnInit(): void {
    this.getAll();
  }

  reset() {
    this.active = undefined;
  }

}

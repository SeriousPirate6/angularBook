import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/model/book';
import { NgForm } from '@angular/forms';

const ApiUrl = 'http://localhost:3000/books';

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
    btn-sm {
      padding: .25rem .5rem;
      font-size: .875rem;
      line-border: 1.5;
      border-radius: .2rem;
    }
  `]
})
export class BookComponent implements OnInit {

  books: Book[] = [];
  error: any;
  constructor(private http: HttpClient) { }

  getAll() {
    this.http.get<Book[]>(ApiUrl)
    .subscribe( (res: Book[]) => {
      this.books = res;
    },
    (error) => this.error = error
    );
  }

  add(form : NgForm) {
    this.http.post<Book>(`${ApiUrl}`, form.value)
      .subscribe((res : Book) => {
        this.books.push(res);
      })
  }

  delete(book: Book) {
    // const index = this.books.indexOf(book);
    const index = this.books.findIndex(b => b.id === book.id);
    this.http.delete<Book>(`${ApiUrl}/${book.id}`)
      .subscribe(() => {
        this.books.splice(index, 1);
      },
      (error) => this.error = error
      );
  }

  ngOnInit(): void {
    this.getAll();
  }

}

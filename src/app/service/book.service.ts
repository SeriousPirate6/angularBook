import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

const ApiUrl = 'http://localhost:8080/bookServer/';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  
  getAll() : Observable <Book[]> {
    return this.http.get<Book[]>(ApiUrl);
  }

  addBook(form: NgForm) : Observable<Book> {
    return this.http.post<Book>(`${ApiUrl}`, form.value)
  }

  editBook(form: NgForm, active: Book) : Observable<Book> {
    return this.http.patch<Book>(`${ApiUrl}?id=${active?.id}`, form.value)
  }

  deleteBook(book: Book) : Observable<Book> {
    return this.http.delete<Book>(`${ApiUrl}?id=${book.id}`)
  }

  detailBook(id: number) : Observable<Book> {
    return this.http.get<Book>(`${ApiUrl}?id=${id}`);
  }

  constructor(private http: HttpClient) { }
}

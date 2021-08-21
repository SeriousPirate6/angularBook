import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-book-detail',
  template: `
  <app-spinner *ngIf="!book" ></app-spinner>
  <div *ngIf="book" class="row">
    <div class="col-lg-8 col-md-10 mx-auto">
      <div class="pull-right">
        <img class="img-thumbnail" width="350" [src]="book.img" [alt]="book.title">
      </div>
      <div class="post-preview">
        <h2 class="post-title">{{book.title}}</h2>
        <small class="post-meta">
          di {{book.author}}
        </small>
        <small class="post-subtitle">
          <br>
          € {{book.price | number: '1.2-2'}}
        </small>
        <small class="post-subtitle">
          <br>
          Isbn:  {{book.isbn}}
        </small>
        <p class="post-title bellottaFont">
          {{book.description | truncate: 900}}
        </p>
        <button class="btn btn-outline-warning btn-sm mr-1" (click)="goBack()">Go Back</button>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .bellottaFont {
      font-family: 'Bellota', cursive;
    }

    .btn-group-sm > .btn, .btn-sm {
      padding: .25rem .5rem;
      font-size: .875rem;
      line-height: 1.5;
      border-radius: .2rem;
    }
  `]
})
export class BookDetailComponent implements OnInit {

  book: Book | undefined;

  constructor(
    private bookService: BookService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params.id;
    this.bookService.detailBook(id)
    .subscribe(res => {
      this.book = res;
    })
  }

}

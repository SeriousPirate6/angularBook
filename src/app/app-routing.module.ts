import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BookDetailComponent } from './features/book-detail/book-detail.component';

const routes: Routes = [
  {path: 'book/:id', component: BookDetailComponent},
  {path: 'book', component: BookComponent},
  {path: '', component: BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

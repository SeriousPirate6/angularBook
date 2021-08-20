import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `<!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand" routerLink=""><i class="fa fa-book"></i>BOOK</a>
      <button class="navbar-toggler navbar-toggler-right" routerLink="login">
          BOOK
        </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" routerLink="book">Book</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Page Header -->
  <header class="masthead" style="background-image: url('../../../assets/img/home-bg.jpg')">
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="site-heading">
            <h1 class="title"><i class="fa fa-female" [style.color]='red'></i> ER CATCALLING</h1>
            <span class="subheading" [style.color]='violet'>"Pa du fischi er cat calling" - Damiano Er Faina</span>
          </div>
        </div>
      </div>
    </div>
  </header>
`,
  styles: [`
  .fa.fa-book {
    margin-right: 5px !important;
    color:orange;
  }
  .navbar-brand {
    font-size: 2.5rem;
    font-weight: 100 !important;
    // font-family: 'Amatic SC', cursive;
  }
  .title {
    font-size: 7.2 rem !important;
    // font-family: 'Amatic SC', cursive;
  }

  .masthead {
    max-height: 450px;
  }

  #mainNav .navbar-nav > li.nav-item > a {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
  }  
  header.masthead .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #212529;
    opacity: 0.5;
  }
  `]
})
export class HeaderComponent implements OnInit {

  red: string = "";
  violet: string = 'violet';

  constructor() { }

  ngOnInit(): void {
    this.red = 'red';
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  profile:any = "";
  constructor() { }

  ngOnInit(): void {
    this.validateProfile();
  }

  validateProfile(){
    this.profile = localStorage.getItem("_PROFILE");
  }

}

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  
  favoriteSeason: string = "";
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  constructor(
  ) { }

  ngOnInit(): void {
  }

  openDialog(){
    Swal.fire({
      html: `Hola`,
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, Cerrar Sesión',
    }).then((result) => {
      if (result.value) {

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
    
  }

}

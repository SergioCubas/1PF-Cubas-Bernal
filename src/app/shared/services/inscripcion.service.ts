import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class InscripcionService {
    private env =  environment;

    constructor(
        private http: HttpClient
    ){}
    
    getInscripciones(idStudent:number){
        return this.http.get(this.env.api + `/inscritos`, {
            headers: new HttpHeaders({
            'content-type':'application/json'
            })
        })
        .pipe(
            map(
            (inscripciones:any) => {
                return inscripciones.filter(
                    (data:any) => {
                        return data.idEstudiante === idStudent;
                    }
                )
                }
            )
        )
        .pipe(catchError(this.manejoError));
    }

    private manejoError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
          console.warn('Error en el Front:', error.error.message)
        }else{
          console.warn('Error en el Back:', error.status, error.error.message)
        }
        return throwError( ()=> 'Error de comunicación HTTP');
      }
}
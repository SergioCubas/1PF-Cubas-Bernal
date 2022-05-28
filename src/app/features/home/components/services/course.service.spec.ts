import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CourseService } from './course.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CourseComponent } from '../course/course.component';

describe('CourseService', () => {
  let service: CourseService;
  let env =  environment;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [
        CourseService
      ]
    });
    service = TestBed.inject(CourseService);
  });

  it('Debe de crearse correctamente ', ()=> {
    expect(service).toBeTruthy();
  });

  it('los cursos deben cargarse exitosamente', 
    inject([HttpTestingController, CourseService],
      (httpMock: HttpTestingController, courseService: CourseService) => {
        const mockCourse:any = [
          {
            "name": "Central Implementation Officer",
            "id": "1"
          }
        ];

        courseService.getCourseForId("1").subscribe( (course:any) => {
          expect(course.id).toEqual(mockCourse.id);
        });

        const request = httpMock.expectOne({
          method: 'GET',
          url: env.api + `/cursos/1`
        });
        request.flush({});
  
      }),
  )


});

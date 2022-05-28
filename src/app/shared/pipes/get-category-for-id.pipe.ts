import { Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';
import { CourseService } from 'src/app/features/home/components/services/course.service';

@Pipe({
  name: 'getCategoryForId'
})
export class GetCategoryForIdPipe implements PipeTransform {
  constructor(
    private courseService: CourseService,
  ) { }

  transform(idCategory:string): any {
    this.courseService.getCourseForId(idCategory)
    .subscribe(
      (data:any) => {
          return data.name;
      }
    )
  }

}

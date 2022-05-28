import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/features/home/components/interfaces/course";

export const crearCourse = createAction(
    '[Course] extracción de data',
    props<{ course: Course }>()
)
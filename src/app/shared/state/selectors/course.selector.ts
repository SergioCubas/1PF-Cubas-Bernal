import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CourseState } from "../models/course.state.model";

export const selectorCourse = (state: AppState) => state.course;

export const selectorCourseActiva = createSelector(
    selectorCourse,
    (state: CourseState) => state
)
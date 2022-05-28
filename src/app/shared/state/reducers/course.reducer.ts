import { createReducer, on } from "@ngrx/store";
import { crearCourse } from "../actions/course.action";
import { crearSession } from "../actions/sesion.action";
import { CourseState } from "../models/course.state.model";

export const estadoInicial: CourseState = {
    sesionActiva: false,
    course: {
        id: 0,
        name: ""
    }
}

export const courseReducer = createReducer(
    estadoInicial,
    on( crearCourse, (estado, { course }) => {
        return { ...estado, sesionActiva: true, course}
    })
)
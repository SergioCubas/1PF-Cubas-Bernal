import { ActionReducerMap } from "@ngrx/store";
import { CourseState } from "./models/course.state.model";
import { SessionState } from "./models/sesion.state.model";
import { courseReducer } from "./reducers/course.reducer";
import { loginReducer } from "./reducers/login.reducer";

export interface AppState {
    sesion: SessionState,
    course: CourseState
};

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    sesion: loginReducer,
    course: courseReducer
}
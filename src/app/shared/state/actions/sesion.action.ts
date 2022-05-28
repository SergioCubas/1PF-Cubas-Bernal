import { createAction, props } from "@ngrx/store";
import { User } from "src/app/features/home/components/interfaces/user";

export const crearSession = createAction(
    '[Auth Login] Sesion creada',
    props<{ user: User }>()
)
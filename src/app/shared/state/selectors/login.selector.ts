import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { SessionState } from "../models/sesion.state.model";

export const selectorSesion = (state: AppState) => state.sesion;

export const selectorSesionActiva = createSelector(
    selectorSesion,
    (state: SessionState) => state
)
import { createReducer, on } from "@ngrx/store";
import { crearSession } from "../actions/sesion.action";
import { SessionState } from "../models/sesion.state.model";

export const estadoInicial: SessionState = {
    sesionActiva: false,
    user: {
        email: "",
        password: "",
        nombre: "",
        direccion: "",
        telefono: "",
        perfil: "",
        id: "",
    }
}

export const loginReducer = createReducer(
    estadoInicial,
    on( crearSession, (estado, { user }) => {
        return { ...estado, sesionActiva: true, user}
    })
)
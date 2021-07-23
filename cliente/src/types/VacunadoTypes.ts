import { Vacuna } from './VacunaTypes'

export interface Paciente {
     id?: number,
     nombre: string,
     cedula: number,
     apellido: string,
     telefono: string,
     fechaNacimiento: string
}

export interface Vacunado {
     id?: number,
     pacienteId: number,
     vacunaId: number,
     fechaVacunacion: Date,
     paciente?: Paciente | null,
     vacuna?: Vacuna | null
}

export type VacunadoDispatch = (arg0: VacunadoActions) => void

export enum VacunadoActionsEnum {
     INSERT_VACUNADO_SUCCESS = 'INSERT_VACUNADO_SUCCESS',
     INSERT_VACUNADO_STARTED = 'INSERT_VACUNADO_STARTED',
     // -----------------------------------------------------------
     POPULATE_VACUNADO_SUCCESS = 'POPULATE_VACUNADO_SUCCESS',
     POPULATE_VACUNADO_STARTED = 'POPULATE_VACUNADO_STARTED',
     //-------------------------------------------------------------
     DELETE_VACUNADO_SUCCESS = 'DELETE_VACUNADO_SUCCESS',
     DELETE_VACUNADO_STARTED = 'DELETE_VACUNADO_STARTED',
     //-------------------------------------------------------------
     //-------------------------------------------------------------
     UPDATE_VACUNADO_SUCCESS = 'UPDATE_VACUNADO_SUCCESS',
     UPDATE_VACUNADO_STARTED = 'UPDATE_VACUNADO_STARTED',
}
// ---------------------------------------------------------------

export type InsertVacunadoActionSuccess = {
     type: VacunadoActionsEnum.INSERT_VACUNADO_SUCCESS,
     payload: null
}
export type InsertVacunadoActionStarted = {
     type: VacunadoActionsEnum.INSERT_VACUNADO_STARTED,
     payload: null
}
// ---------------------------------------------------------

export type PopulateVacunadoActionSuccess = {
     type: VacunadoActionsEnum.POPULATE_VACUNADO_SUCCESS,
     payload: Array<Vacunado>
}

export type PopulateVacunadoActionStarted = {
     type: VacunadoActionsEnum.POPULATE_VACUNADO_STARTED,
     payload: null
}
// ---------------------------------------------------------
export type DeleteVacunadoActionSuccess = {
     type: VacunadoActionsEnum.DELETE_VACUNADO_SUCCESS,
     payload: number
}

export type DeleteVacunadoActionStarted = {
     type: VacunadoActionsEnum.DELETE_VACUNADO_STARTED,
     payload: null
}
// ---------------------------------------------------------
export type UpdateVacunadoActionSuccess = {
     type: VacunadoActionsEnum.UPDATE_VACUNADO_SUCCESS,
     payload: Vacunado
}

export type UpdateVacunadoActionStarted = {
     type: VacunadoActionsEnum.UPDATE_VACUNADO_STARTED,
     payload: null
}

export type VacunadoActions = (
     InsertVacunadoActionSuccess | InsertVacunadoActionStarted |
     PopulateVacunadoActionSuccess | PopulateVacunadoActionStarted |
     DeleteVacunadoActionSuccess | DeleteVacunadoActionStarted |
     UpdateVacunadoActionStarted | UpdateVacunadoActionSuccess
)
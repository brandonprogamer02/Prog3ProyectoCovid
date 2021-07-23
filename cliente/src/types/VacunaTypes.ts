import { Provincia } from "./ProvinciaTypes"


export interface Vacuna {
     id?: number,
     nombre: string,
     provincia: Provincia
}

// ----------------------------------------------------------------

export type VacunaDispatch = (arg0: VacunaActions) => void


export enum VacunaActionsEnum {
     INSERT_VACUNA_SUCCESS = 'INSERT_VACUNA_SUCCESS',
     INSERT_VACUNA_STARTED = 'INSERT_VACUNA_STARTED',
     // -----------------------------------------------------------
     POPULATE_VACUNA_SUCCESS = 'POPULATE_VACUNA_SUCCESS',
     POPULATE_VACUNA_STARTED = 'POPULATE_VACUNA_STARTED',
     //-------------------------------------------------------------
     DELETE_VACUNA_SUCCESS = 'DELETE_VACUNA_SUCCESS',
     DELETE_VACUNA_STARTED = 'DELETE_VACUNA_STARTED',
     //-------------------------------------------------------------
     //-------------------------------------------------------------
     UPDATE_VACUNA_SUCCESS = 'UPDATE_VACUNA_SUCCESS',
     UPDATE_VACUNA_STARTED = 'UPDATE_VACUNA_STARTED',
}
// ---------------------------------------------------------------

export type InsertVacunaActionSuccess = {
     type: VacunaActionsEnum.INSERT_VACUNA_SUCCESS,
     payload: Vacuna
}
export type InsertVacunaActionStarted = {
     type: VacunaActionsEnum.INSERT_VACUNA_STARTED,
     payload: null
}
// ---------------------------------------------------------

export type PopulateVacunaActionSuccess = {
     type: VacunaActionsEnum.POPULATE_VACUNA_SUCCESS,
     payload: Array<Vacuna>
}

export type PopulateVacunaActionStarted = {
     type: VacunaActionsEnum.POPULATE_VACUNA_STARTED,
     payload: null
}
// ---------------------------------------------------------
export type DeleteVacunaActionSuccess = {
     type: VacunaActionsEnum.DELETE_VACUNA_SUCCESS,
     payload: number
}

export type DeleteVacunaActionStarted = {
     type: VacunaActionsEnum.DELETE_VACUNA_STARTED,
     payload: null
}
// ---------------------------------------------------------
export type UpdateVacunaActionSuccess = {
     type: VacunaActionsEnum.UPDATE_VACUNA_SUCCESS,
     payload: Vacuna
}

export type UpdateVacunaActionStarted = {
     type: VacunaActionsEnum.UPDATE_VACUNA_STARTED,
     payload: null
}

export type VacunaActions = (
     InsertVacunaActionSuccess | InsertVacunaActionStarted |
     PopulateVacunaActionSuccess | PopulateVacunaActionStarted |
     DeleteVacunaActionSuccess | DeleteVacunaActionStarted |
     UpdateVacunaActionStarted | UpdateVacunaActionSuccess
)


export interface Provincia {
     id?: number,
     nombre: string,
     vacunas?: Array<any> | null
}


// ----------------------------------------------------------------

export type ProvinciaDispatch = (arg0: ProvinciaActions) => void


export enum ProvinciaActionsEnum {
     INSERT_PROVINCIA_SUCCESS = 'INSERT_PROVINCIA_SUCCESS',
     INSERT_PROVINCIA_STARTED = 'INSERT_PROVINCIA_STARTED',
     // -----------------------------------------------------------
     POPULATE_PROVINCIAS_SUCCESS = 'POPULATE_PROVINCIAS_SUCCESS',
     POPULATE_PROVINCIAS_STARTED = 'POPULATE_PROVINCIAS_STARTED',
     //-------------------------------------------------------------
     DELETE_PROVINCIAS_SUCCESS = 'DELETE_PROVINCIAS_SUCCESS',
     DELETE_PROVINCIAS_STARTED = 'DELETE_PROVINCIAS_STARTED',
     //-------------------------------------------------------------
     //-------------------------------------------------------------
     UPDATE_PROVINCIAS_SUCCESS = 'UPDATE_PROVINCIAS_SUCCESS',
     UPDATE_PROVINCIAS_STARTED = 'UPDATE_PROVINCIAS_STARTED',
}
// ---------------------------------------------------------------

export type InsertProvinciaActionSuccess = {
     type: ProvinciaActionsEnum.INSERT_PROVINCIA_SUCCESS,
     payload: Provincia
}
export type InsertProvinciaActionStarted = {
     type: ProvinciaActionsEnum.INSERT_PROVINCIA_STARTED,
     payload: null
}
// ---------------------------------------------------------

export type PopulateProvinciaActionSuccess = {
     type: ProvinciaActionsEnum.POPULATE_PROVINCIAS_SUCCESS,
     payload: Array<Provincia>
}

export type PopulateProvinciaActionStarted = {
     type: ProvinciaActionsEnum.POPULATE_PROVINCIAS_STARTED,
     payload: null
}
// ---------------------------------------------------------
export type DeleteProvinciaActionSuccess = {
     type: ProvinciaActionsEnum.DELETE_PROVINCIAS_SUCCESS,
     payload: number
}

export type DeleteProvinciaActionStarted = {
     type: ProvinciaActionsEnum.DELETE_PROVINCIAS_STARTED,
     payload: null
}
// ---------------------------------------------------------
export type UpdateProvinciaActionSuccess = {
     type: ProvinciaActionsEnum.UPDATE_PROVINCIAS_SUCCESS,
     payload: Provincia
}

export type UpdateProvinciaActionStarted = {
     type: ProvinciaActionsEnum.UPDATE_PROVINCIAS_STARTED,
     payload: null
}


export type ProvinciaActions = (
     InsertProvinciaActionSuccess | InsertProvinciaActionStarted |
     PopulateProvinciaActionSuccess | PopulateProvinciaActionStarted |
     DeleteProvinciaActionSuccess | DeleteProvinciaActionStarted |
     UpdateProvinciaActionStarted | UpdateProvinciaActionSuccess
)
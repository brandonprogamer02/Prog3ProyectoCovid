import { CombinedState, createStore, Reducer } from "redux";
import { Provincia } from "./ProvinciaTypes";
import { Vacuna } from "./VacunaTypes";
import { Vacunado } from "./VacunadoTypes";


export interface State {
     provincias: Provincia[],
     vacunas: Vacuna[],
     // vacunados: Vacunado[]
}


export type CombineReducer = CombinedState<State>


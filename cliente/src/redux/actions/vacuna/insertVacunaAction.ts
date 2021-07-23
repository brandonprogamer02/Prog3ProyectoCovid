import {
     Vacuna, VacunaActionsEnum, VacunaDispatch,
     InsertVacunaActionSuccess, InsertVacunaActionStarted
} from "../../../types/VacunaTypes"
import VacunaServices from '../../../services/vacunaServices'
import ProvinciaServices from '../../../services/provinciaServices'

import { State } from "../../../types/storeTypes"
import { Provincia } from "../../../types/ProvinciaTypes"


const insertProvinciaAction = (vacuna: Vacuna) => (dispatch: VacunaDispatch, getState: State) => {

     function onStart(): InsertVacunaActionStarted {
          return {
               type: VacunaActionsEnum.INSERT_VACUNA_STARTED,
               payload: null
          }
     }

     function onSuccess(vacuna: Vacuna): InsertVacunaActionSuccess {
          return {
               type: VacunaActionsEnum.INSERT_VACUNA_SUCCESS,
               payload: vacuna
          }
     }

     dispatch(onStart())



     VacunaServices.insertVacuna(vacuna)
          .then(async (_vacuna) => {
               // getting provincia object
               // const provincias = await ProvinciaServices.getProvincias()
               // let provincia: Provincia = { nombre: '', id: -1 }
               // provincias.forEach(_provincia => {
               //      if (_provincia.id == _vacuna.provincia.id) provincia = _provincia
               // })
               // const newVacuna = { ..._vacuna, provincia }

               dispatch(onSuccess({ ...vacuna, id: _vacuna.id }))
          })
}
export default insertProvinciaAction

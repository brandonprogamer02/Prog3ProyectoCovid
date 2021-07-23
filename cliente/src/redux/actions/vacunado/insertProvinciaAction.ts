import {
     Vacunado, VacunadoActionsEnum, VacunadoDispatch,
     InsertVacunadoActionSuccess, InsertVacunadoActionStarted
} from "../../../types/VacunadoTypes"
import VacunadoServices from '../../../services/vacunadoServices'
import { State } from "../../../types/storeTypes"
import populateVacunadoAction from "./populateVacunadoAction"


const insertVacunadoAction = (Vacunado: Vacunado) => (dispatch: VacunadoDispatch, getState: State) => {

     function onStart(): InsertVacunadoActionStarted {
          return {
               type: VacunadoActionsEnum.INSERT_VACUNADO_STARTED,
               payload: null
          }
     }

     function onSuccess(): InsertVacunadoActionSuccess {
          return {
               type: VacunadoActionsEnum.INSERT_VACUNADO_SUCCESS,
               payload: null
          }
     }

     dispatch(onStart())

     VacunadoServices.insertVacunado(Vacunado)
          .then(async (response1) => {
               const _dispatchAny: any = dispatch
               // lanzamos el popute ya que la api no nos devuelve la informacion completa
               _dispatchAny(populateVacunadoAction({}));
               dispatch(onSuccess())
          })
}
export default insertVacunadoAction

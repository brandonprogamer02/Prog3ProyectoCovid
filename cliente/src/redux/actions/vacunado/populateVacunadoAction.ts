import {
     Vacunado, VacunadoActionsEnum, VacunadoDispatch,
     PopulateVacunadoActionStarted, PopulateVacunadoActionSuccess,
} from "../../../types/VacunadoTypes"
import VacunadoServices from '../../../services/vacunadoServices'
import { State } from "../../../types/storeTypes"


type Param = {
     provincia?: string,
     vacuna?: string,
     signoZodiacal?: string,
     nombrePaciente?: string
}

const populateVacunadoAction = (param: Param) => (dispatch: VacunadoDispatch, getState: State) => {

     function onStart(): PopulateVacunadoActionStarted {
          return {
               type: VacunadoActionsEnum.POPULATE_VACUNADO_STARTED,
               payload: null
          }
     }

     function onSuccess(vacunados: Array<Vacunado>): PopulateVacunadoActionSuccess {
          return {
               type: VacunadoActionsEnum.POPULATE_VACUNADO_SUCCESS,
               payload: vacunados
          }
     }

     dispatch(onStart())

     VacunadoServices.getVacunados(param)
          .then(response1 => {
               dispatch(onSuccess(response1))
          })
}

export default populateVacunadoAction
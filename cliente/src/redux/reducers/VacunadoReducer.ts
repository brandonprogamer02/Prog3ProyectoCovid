import VacunadoServices from '../../services/vacunadoServices'
import { Vacunado, VacunadoActions, VacunadoActionsEnum } from '../../types/VacunadoTypes'

const initialState: Vacunado[] = []

export default function VacunadoReducer(state = initialState, action: VacunadoActions) {

     const { POPULATE_VACUNADO_STARTED, POPULATE_VACUNADO_SUCCESS, INSERT_VACUNADO_STARTED,
          INSERT_VACUNADO_SUCCESS, DELETE_VACUNADO_SUCCESS, DELETE_VACUNADO_STARTED, UPDATE_VACUNADO_STARTED,
          UPDATE_VACUNADO_SUCCESS
     } = VacunadoActionsEnum
     switch (action.type) {
          case INSERT_VACUNADO_STARTED:
               return state

          case INSERT_VACUNADO_SUCCESS:
               return state
          case POPULATE_VACUNADO_STARTED:
               return state

          case POPULATE_VACUNADO_SUCCESS:
               return action.payload

          case DELETE_VACUNADO_STARTED:
               return state

          case DELETE_VACUNADO_SUCCESS:
               const VacunadoId = action.payload
               return state.filter(Vacunado => Vacunado.id != VacunadoId)

          case UPDATE_VACUNADO_STARTED:
               return state

          case UPDATE_VACUNADO_SUCCESS:
               const VacunadoReceived = action.payload
               return state.map(Vacunado => Vacunado.id == VacunadoReceived.id ? VacunadoReceived : Vacunado)
          default: return state
     }

}
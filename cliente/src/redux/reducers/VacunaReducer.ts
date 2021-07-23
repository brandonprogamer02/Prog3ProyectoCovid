import VacunaServices from '../../services/vacunaServices'
import { Vacuna, VacunaActions, VacunaActionsEnum } from '../../types/VacunaTypes'

const initialState: Vacuna[] = []

export default function VacunaReducer(state = initialState, action: VacunaActions) {

     const { POPULATE_VACUNA_STARTED, POPULATE_VACUNA_SUCCESS, INSERT_VACUNA_STARTED,
          INSERT_VACUNA_SUCCESS, DELETE_VACUNA_SUCCESS, DELETE_VACUNA_STARTED, UPDATE_VACUNA_STARTED,
          UPDATE_VACUNA_SUCCESS
     } = VacunaActionsEnum
     switch (action.type) {
          case INSERT_VACUNA_STARTED:
               return state

          case INSERT_VACUNA_SUCCESS:
               return [...state, action.payload]
          case POPULATE_VACUNA_STARTED:
               return state

          case POPULATE_VACUNA_SUCCESS:
               return action.payload

          case DELETE_VACUNA_STARTED:
               return state

          case DELETE_VACUNA_SUCCESS:
               const provinciaId = action.payload
               return state.filter(provincia => provincia.id != provinciaId)

          case UPDATE_VACUNA_STARTED:
               return state

          case UPDATE_VACUNA_SUCCESS:
               const provinciaReceived = action.payload
               return state.map(provincia => provincia.id == provinciaReceived.id ? provinciaReceived : provincia)
          default: return state
     }

}


import ProvinciaServices from '../../services/provinciaServices'
import { Provincia, ProvinciaActions, ProvinciaActionsEnum } from '../../types/ProvinciaTypes'

const initialState: Provincia[] = []

export default function provinciaReducer(state = initialState, action: ProvinciaActions) {

     const { POPULATE_PROVINCIAS_STARTED, POPULATE_PROVINCIAS_SUCCESS, INSERT_PROVINCIA_STARTED,
          INSERT_PROVINCIA_SUCCESS, DELETE_PROVINCIAS_SUCCESS, DELETE_PROVINCIAS_STARTED, UPDATE_PROVINCIAS_STARTED,
          UPDATE_PROVINCIAS_SUCCESS
     } = ProvinciaActionsEnum
     switch (action.type) {
          case INSERT_PROVINCIA_STARTED:
               return state

          case INSERT_PROVINCIA_SUCCESS:
               return [...state, action.payload]
          case POPULATE_PROVINCIAS_STARTED:
               return state

          case POPULATE_PROVINCIAS_SUCCESS:
               return action.payload

          case DELETE_PROVINCIAS_STARTED:
               return state

          case DELETE_PROVINCIAS_SUCCESS:
               const provinciaId = action.payload
               return state.filter(provincia => provincia.id != provinciaId)

          case UPDATE_PROVINCIAS_STARTED:
               return state

          case UPDATE_PROVINCIAS_SUCCESS:
               const provinciaReceived = action.payload
               return state.map(provincia => provincia.id == provinciaReceived.id ? provinciaReceived : provincia)
          default: return state
     }

}
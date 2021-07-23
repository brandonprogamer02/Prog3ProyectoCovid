import {
     Provincia, ProvinciaActionsEnum, ProvinciaDispatch,
     DeleteProvinciaActionStarted, DeleteProvinciaActionSuccess
} from "../../../types/ProvinciaTypes"
import ProvinciaServices from '../../../services/provinciaServices'
import { State } from "../../../types/storeTypes"


const deleteProvinciaAction = (provinciaId: number) => (dispatch: ProvinciaDispatch, getState: State) => {
     function onStart(): DeleteProvinciaActionStarted {
          return {
               type: ProvinciaActionsEnum.DELETE_PROVINCIAS_STARTED,
               payload: null
          }
     }
     function onSuccess(provinciaId: number): DeleteProvinciaActionSuccess {
          return {
               type: ProvinciaActionsEnum.DELETE_PROVINCIAS_SUCCESS,
               payload: provinciaId
          }
     }
     dispatch(onStart())
     ProvinciaServices.deleteProvincia(provinciaId)
          .then(response1 => {
               dispatch(onSuccess(provinciaId))
          })
}
export default deleteProvinciaAction

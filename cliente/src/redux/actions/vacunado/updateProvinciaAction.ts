import {
     Provincia, ProvinciaActionsEnum, ProvinciaDispatch,
     DeleteProvinciaActionStarted, DeleteProvinciaActionSuccess, UpdateProvinciaActionStarted, UpdateProvinciaActionSuccess
} from "../../../types/ProvinciaTypes"
import ProvinciaServices from '../../../services/provinciaServices'
import { State } from "../../../types/storeTypes"


const updateProvinciaAction = (provincia: Provincia) => (dispatch: ProvinciaDispatch, getState: State) => {
     function onStart(): UpdateProvinciaActionStarted {
          return {
               type: ProvinciaActionsEnum.UPDATE_PROVINCIAS_STARTED,
               payload: null
          }
     }
     function onSuccess(provincia: Provincia): UpdateProvinciaActionSuccess {
          return {
               type: ProvinciaActionsEnum.UPDATE_PROVINCIAS_SUCCESS,
               payload: provincia
          }
     }
     dispatch(onStart())
     ProvinciaServices.updateProvincia(provincia)
          .then(response1 => {
               // console.log('response1:', response1)
               dispatch(onSuccess(provincia))
          })
}
export default updateProvinciaAction

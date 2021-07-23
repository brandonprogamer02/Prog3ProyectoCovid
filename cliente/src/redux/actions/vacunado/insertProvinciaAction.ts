import {
     Provincia, ProvinciaActionsEnum, ProvinciaDispatch,
     InsertProvinciaActionSuccess, InsertProvinciaActionStarted
} from "../../../types/ProvinciaTypes"
import ProvinciaServices from '../../../services/provinciaServices'
import { State } from "../../../types/storeTypes"


const insertProvinciaAction = (provincia: Provincia) => (dispatch: ProvinciaDispatch, getState: State) => {

     function onStart(): InsertProvinciaActionStarted {
          return {
               type: ProvinciaActionsEnum.INSERT_PROVINCIA_STARTED,
               payload: null
          }
     }

     function onSuccess(provincia: Provincia): InsertProvinciaActionSuccess {
          return {
               type: ProvinciaActionsEnum.INSERT_PROVINCIA_SUCCESS,
               payload: provincia
          }
     }

     dispatch(onStart())

     ProvinciaServices.insertProvincia(provincia)
          .then(response1 => {
               dispatch(onSuccess(response1))
          })
}
export default insertProvinciaAction

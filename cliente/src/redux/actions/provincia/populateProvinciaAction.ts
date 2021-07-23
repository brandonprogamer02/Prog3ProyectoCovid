import {
     Provincia, ProvinciaActionsEnum, ProvinciaDispatch,
     PopulateProvinciaActionStarted, PopulateProvinciaActionSuccess,
} from "../../../types/ProvinciaTypes"
import ProvinciaServices from '../../../services/provinciaServices'
import { State } from "../../../types/storeTypes"


const populateProvinciaAction = () => (dispatch: ProvinciaDispatch, getState: State) => {

     function onStart(): PopulateProvinciaActionStarted {
          return {
               type: ProvinciaActionsEnum.POPULATE_PROVINCIAS_STARTED,
               payload: null
          }
     }

     function onSuccess(provincias: Array<Provincia>): PopulateProvinciaActionSuccess {
          return {
               type: ProvinciaActionsEnum.POPULATE_PROVINCIAS_SUCCESS,
               payload: provincias
          }
     }

     dispatch(onStart())

     ProvinciaServices.getProvincias()
          .then(response1 => {
               dispatch(onSuccess(response1))
          })
}

export default populateProvinciaAction
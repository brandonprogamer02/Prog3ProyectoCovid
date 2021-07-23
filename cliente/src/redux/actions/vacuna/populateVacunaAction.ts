import {
     Vacuna, VacunaActionsEnum, VacunaDispatch,
     PopulateVacunaActionStarted, PopulateVacunaActionSuccess,
} from "../../../types/VacunaTypes"
import VacunaServices from '../../../services/vacunaServices'
import ProvinciaServices from '../../../services/provinciaServices'
import { State } from "../../../types/storeTypes"
import { Provincia } from "../../../types/ProvinciaTypes"

const populateVacunaAction = () => (dispatch: VacunaDispatch, getState: State) => {

     function onStart(): PopulateVacunaActionStarted {
          return {
               type: VacunaActionsEnum.POPULATE_VACUNA_STARTED,
               payload: null
          }
     }

     function onSuccess(provincias: Array<Vacuna>): PopulateVacunaActionSuccess {
          return {
               type: VacunaActionsEnum.POPULATE_VACUNA_SUCCESS,
               payload: provincias
          }
     }

     dispatch(onStart())

     VacunaServices.getVacunas()
          .then(async (response) => {
               const provincias = await ProvinciaServices.getProvincias()
               const vacunas: Vacuna[] = response.map(vacuna => {
                    let provincia: Provincia = { nombre: '', id: -1 }
                    provincias.forEach(_provincia => {

                         if (_provincia.id == (vacuna as any).provinciaId) provincia = _provincia
                    })
                    const newVacuna = {
                         id: vacuna.id,
                         nombre: vacuna.nombre,
                         provincia
                    }
                    return newVacuna
               })
               dispatch(onSuccess(vacunas))
          })
}

export default populateVacunaAction
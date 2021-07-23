import store from "./redux/store";
import { Provincia } from "./types/ProvinciaTypes";
import { Vacuna } from "./types/VacunaTypes";


export function removeDuplicatesFromArray<T>(array: Array<T>, key: string): Array<T> {
     var arrThree = array

     function filterArray(inputArr: any) {
          var found: any = {};
          var out = inputArr.filter(function (element: any) {
               return found.hasOwnProperty(element[key]) ? false : (found[element[key]] = true)
          });
          return out
     }

     const outputArray = filterArray(arrThree)
     return outputArray
}


export function getProvinciaFromProvinciaName(provinciaName: string): Provincia {
     const provincias = store.getState().provincias
     let provincia: Provincia = { nombre: '' }
     //obtenemos el objeto provincia apartir de su nombre
     provincias.forEach(_provincia => {
          if (_provincia.nombre == provinciaName) provincia = _provincia
     })
     return provincia
}

export function getVacunasFromVacunaName(vacunaName: string): Vacuna[] {
     const vacunas = store.getState().vacunas
     let vacunasLog: Vacuna[] = []
     //obtenemos el objeto provincia apartir de su nombre
     vacunas.forEach(_vacuna => {
          if (_vacuna.nombre == vacunaName) vacunasLog.push(_vacuna)
     })
     return vacunasLog
}
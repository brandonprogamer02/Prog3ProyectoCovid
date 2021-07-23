import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import insertVacunaAction from '../../redux/actions/vacuna/insertVacunaAction';
import { Provincia } from '../../types/ProvinciaTypes';
import { State } from '../../types/storeTypes';
import { Vacuna } from '../../types/VacunaTypes';
import s from './VacunasView.module.css'

export default function VacunasView() {
     const state = useSelector((state: State) => state);
     const dispatch = useDispatch<any>()
     const [selectProvincia, setSelectProvincia] = useState<string>('')
     const [txtVacuna, setTxtVacuna] = useState<string>('')

     useEffect(() => {
          // console.log(state.provincias)
          // esto es para que este seleccionado el que esta en la posicion cero por defecto
          if (state.provincias.length != 0 && selectProvincia == '') setSelectProvincia(state.provincias[0].nombre)
     }, [state.provincias])

     function newVacuna() {

          let vacuna: Vacuna = {
               nombre: txtVacuna,
               provincia: {
                    nombre: selectProvincia
               }
          }

          const provincias = state.provincias
          //obtenemos el objeto provincia aparatuir de su nombre
          provincias.forEach(_provincia => {
               if (_provincia.nombre == vacuna.provincia.nombre) vacuna.provincia = _provincia
          })

          dispatch(insertVacunaAction(vacuna))
     }

     return (
          <div className={s['_container']}>
               <div className={s['add']}>
                    <div >
                         <label className='my-2 h5'>Anadir Nueva Vacuna</label>
                         <input
                              className='my-2 px-3' type="text" value={txtVacuna} onChange={e => setTxtVacuna(e.currentTarget.value)}
                         /> <br />
                         <select value={selectProvincia} onChange={(e) => setSelectProvincia(e.currentTarget.value)}>
                              {state.provincias.map(provincia => (
                                   <option key={provincia.id}>{provincia.nombre}</option>
                              ))}
                         </select>
                         <button className='my-2 p-2 btn btn-success' style={{ color: 'white' }}
                              onClick={newVacuna}
                         > Guardar Vacuna</button>
                    </div>
               </div>
               <div className={s['vacunas-view-table']}>
                    <table className="table table-striped">
                         <thead className="thead-dark">
                              <tr>
                                   <th scope="col">ID</th>
                                   <th scope="col">First</th>
                                   <th scope="col">Last</th>
                              </tr>
                         </thead>
                         <tbody>
                              {state.vacunas.map(vacuna => (
                                   <tr key={vacuna.id}>
                                        <th scope="row">{vacuna.id}</th>
                                        <td>{vacuna.nombre}</td>
                                        <td>{vacuna.provincia.nombre}</td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     )
}

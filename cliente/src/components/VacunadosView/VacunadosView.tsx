import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import populateVacunadoAction from '../../redux/actions/vacunado/populateVacunadoAction'
import { State } from '../../types/storeTypes'
import { Vacunado } from '../../types/VacunadoTypes'
import { removeDuplicatesFromArray } from '../../utils'
import VacunadoForm from './VacunadosForm/VacunadoForm'
import s from './VacunadosView.module.css'

export default function VacunadosView() {

     const state = useSelector((state: State) => state.vacunados)
     const [selectFiltrado, setSelectFiltrado] = useState('Ninguno')
     const [txtBuscador, setTxtBuscador] = useState('')
     const dispatch = useDispatch<any>()

     function activeFilter() {
          const value = selectFiltrado
          if (value == 'Ninguno') return
          else if (value == 'Nombre') dispatch(populateVacunadoAction({ nombrePaciente: txtBuscador }))
          else if (value == 'Provincia') dispatch(populateVacunadoAction({ provincia: txtBuscador }))
          else if (value == 'Vacuna') dispatch(populateVacunadoAction({ vacuna: txtBuscador }))

     }

     useEffect(() => {
          activeFilter()
     }, [txtBuscador, selectFiltrado])
     return (
          <div className={s['_container']}>
               <div className={s['form-container']}>
                    <VacunadoForm />
               </div>
               <div className={s["vacunados-table"]}>
                    <div>
                         <div>
                              <label>Buscador</label>
                              <input
                                   onChange={e => setTxtBuscador(e.currentTarget.value)}
                                   value={txtBuscador}
                                   type="text" placeholder="Ingresa..."
                              />
                         </div>
                         <div>
                              <label>Filtrar por</label>
                              <select value={selectFiltrado} onChange={e => setSelectFiltrado(e.currentTarget.value)}>
                                   <option>Ninguno</option>
                                   <option>Nombre</option>
                                   <option>Provincia</option>
                                   <option>Vacuna</option>
                                   <option>Signo Zodiacal</option>
                              </select>
                         </div>
                    </div>
                    <table className="table table-striped">
                         <thead className="thead-dark">
                              <tr>
                                   <th scope="col">ID</th>
                                   <th scope="col">Cedula</th>
                                   <th scope="col">Nombre</th>
                                   <th scope="col">Telefono</th>
                                   <th scope="col">Vacuna</th>
                              </tr>
                         </thead>
                         <tbody>
                              {removeDuplicatesFromArray<Vacunado>(state, 'pacienteId').map(vacunado => (
                                   <tr key={vacunado.id}>
                                        {vacunado.paciente && (<>
                                             <th scope="row">{vacunado.id}</th>
                                             <td>{vacunado.paciente.cedula}</td>
                                             <td>{`${vacunado.paciente.nombre} ${vacunado.paciente.apellido}`}</td>
                                             <td>{vacunado.paciente.telefono}</td>
                                             <td>{vacunado.vacuna?.nombre}</td>
                                        </>)}
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     )
}

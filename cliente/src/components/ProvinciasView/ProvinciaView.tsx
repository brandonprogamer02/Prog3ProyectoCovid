import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import insertProvinciaAction from '../../redux/actions/provincia/insertProvinciaAction'
import { Provincia } from '../../types/ProvinciaTypes'
import { State } from '../../types/storeTypes'
import s from './ProvinciaView.module.css'
import editImage from '../../resources/edit.png'
import borrarImage from '../../resources/borrar.png'
import deleteProvinciaAction from '../../redux/actions/provincia/deleteProvinciaAction'
import updateProvinciaAction from '../../redux/actions/provincia/updateProvinciaAction'

export default function ProvinciaView() {

     const dispatch = useDispatch<any>()
     const state = useSelector((state: State) => state.provincias)
     const inputRef = useRef<HTMLInputElement>(null)
     const [txtProvincia, setTxtProvincia] = useState('')
     const [provinciaSelected, setProvinciaSelected] = useState<Provincia | null>(null)

     function deleteProvincia(provinciaId: number) {
          dispatch(deleteProvinciaAction(provinciaId))
     }
     function handlerActionButton() {
          if (provinciaSelected) {
               const provincia: Provincia = {
                    ...provinciaSelected,
                    nombre: txtProvincia
               }
               dispatch(updateProvinciaAction(provincia))
               setProvinciaSelected(null)
               setTxtProvincia('')
          } else {
               const provincia: Provincia = {
                    nombre: txtProvincia
               }
               dispatch(insertProvinciaAction(provincia))
               setTxtProvincia('')
          }
     }
     return (
          <div className={`${s['_container']}`}>
               <div className={s['add']}>
                    <div >
                         <label className='my-2 h5'>
                              {provinciaSelected ? `Actualizar Provincia con ID ${provinciaSelected.id}` : 'Anadir Nueva Provincia'}</label>
                         <input className='my-2 px-3'
                              type="text" value={txtProvincia}
                              onChange={e => setTxtProvincia(e.currentTarget.value)}
                              ref={inputRef}
                         /> <br />
                         {provinciaSelected && (
                              <button
                                   className='my-2 p-2 btn btn-danger'
                                   style={{ color: 'white' }} onClick={() => {
                                        setTxtProvincia('')
                                        setProvinciaSelected(null)
                                   }}
                              > Cancelar
                              </button>
                         )}
                         <button
                              className='my-2 p-2 btn btn-success'
                              style={{ color: 'white' }} onClick={handlerActionButton}
                         > {provinciaSelected ? 'Actualizar Provincia' : 'Guardar Provincia'}
                         </button>

                    </div>
               </div>
               <div className={`${s['provincia-view-table']}`}>
                    <table className="table table-striped">
                         <thead className="thead-dark">
                              <tr>
                                   <th scope="col">ID</th>
                                   <th scope="col">Provincia</th>
                              </tr>
                         </thead>
                         <tbody>
                              {state.map(provincia => (
                                   <tr key={provincia.id}>
                                        <th scope="row">{provincia.id}</th>
                                        <td>{provincia.nombre}</td>
                                        <td>
                                             <img width={25} src={editImage} alt=""
                                                  onClick={() => {
                                                       inputRef.current?.focus()
                                                       setTxtProvincia(provincia.nombre)
                                                       setProvinciaSelected(provincia)
                                                  }}
                                             />

                                        </td>
                                        <td>
                                             <img width={25} src={borrarImage} alt=""
                                                  onClick={() => provincia.id && deleteProvincia(provincia.id)}
                                             />
                                        </td>


                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     )
}

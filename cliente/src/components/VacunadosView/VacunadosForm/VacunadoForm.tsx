import React, { useEffect, useState } from 'react'
import s from './VacunadosForm.module.css'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../../types/storeTypes'
import vacunadoServices from '../../../services/vacunadoServices'
import insertVacunadoAction from '../../../redux/actions/vacunado/insertProvinciaAction'
import { Paciente, Vacunado } from '../../../types/VacunadoTypes'
import { getVacunasFromVacunaName } from '../../../utils'
import { Vacuna } from '../../../types/VacunaTypes'
enum values {
     one,
     two
}
export default function VacunadoForm() {
     const [stateView, setStateView] = useState(values.one)
     const [showModal, setShowModal] = useState(false)
     // input handlers
     const [txtCedula, setTxtCedula] = useState('')
     const [txtNombre, setTxtNombre] = useState('')
     const [txtApellido, setTxtApellido] = useState('')
     const [txtTelefono, setTxtTelefono] = useState('')
     const [txtFechaNac, setTxtFechaNac] = useState('')
     const [selectVacuna, setSelectVacuna] = useState('')

     const state = useSelector((state: State) => state)
     const dispatch = useDispatch<any>()
     const [isNewPaciente, setIsNewPaciente] = useState(true)
     const [dataTableVacunasAnteriores, setDataTableVacunasAnteriores] = useState<Vacunado[]>([])

     async function saveVacunado(e: React.FormEvent) {
          e.preventDefault()
          console.log('entrando')
          const vacunadoFinded: Vacunado = await vacunadoServices.getVacunadoByCedula(Number(txtCedula))
          // console.log('paciente eh:', paciente)
          let pacienteId = -1
          const vacunas = getVacunasFromVacunaName(selectVacuna == '' ? state.vacunas[0].nombre : selectVacuna)
          if (vacunadoFinded) pacienteId = (vacunadoFinded.paciente as Paciente).id as number
          else {
               const pacienteToSend: Paciente = {
                    apellido: txtApellido,
                    cedula: Number(txtCedula),
                    fechaNacimiento: txtFechaNac,
                    nombre: txtNombre,
                    telefono: txtTelefono
               }
               console.log(pacienteToSend)
               const paciente = await vacunadoServices.insertPaciente(pacienteToSend)
               pacienteId = paciente.id as number
          }
          const vacunado: Vacunado = {
               fechaVacunacion: new Date(),
               pacienteId,
               vacunaId: vacunas[0].id as number
          }
          console.log(vacunado)
          dispatch(insertVacunadoAction(vacunado))
          cancelar()
     }

     function cancelar() {

          setStateView(values.one)
          setIsNewPaciente(true)
          setTxtCedula('')
          setTxtNombre('')
          setTxtApellido('')
          setTxtTelefono('')
          setTxtFechaNac('')
          setSelectVacuna('')

     }

     function manageMarckoup() {
          async function handler() {
               setStateView(values.two)
               const res = await vacunadoServices.getVacunadoByCedula(Number(txtCedula))
               if (res) {
                    if (res.paciente && res.vacuna) {
                         setIsNewPaciente(false)
                         setTxtNombre(res.paciente.nombre)
                         setTxtApellido(res.paciente.apellido)
                         setTxtTelefono(res.paciente.telefono)
                         setTxtFechaNac(res.paciente.fechaNacimiento)
                         setSelectVacuna(res.vacuna.nombre)
                    }
               }
               else setIsNewPaciente(true)
          }

          switch (stateView) {
               case values.one:
                    return <form className={s['form-container-checkig-cedula']}>
                         <div>

                              <label className='my-2 h5' >Anadir Nuevo Vacunado</label>
                              <input className='my-2 px-3' placeholder='Ingrese la cedula' type="number"
                                   value={txtCedula} onChange={e => setTxtCedula(e.currentTarget.value)}
                              /> <br />
                              <button className='my-2 p-2 btn btn-success' style={{ color: 'white' }}
                                   onClick={handler}
                              > Proceder</button>
                         </div>
                    </form>
               case values.two:
                    return <form className={s['form-container-adding_data']}>
                         <div>
                              <div>
                                   <label className='my-2 '>Cedula</label>
                                   <label className='my-2 px-2'>{txtCedula}</label> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Nombre</label>
                                   <input className='my-2 px-2' type="text" disabled={isNewPaciente ? false : true}
                                        value={txtNombre} onChange={e => setTxtNombre(e.currentTarget.value)}
                                   /> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Apellido</label>
                                   <input className='my-2 px-2' type="text" disabled={isNewPaciente ? false : true}
                                        value={txtApellido} onChange={e => setTxtApellido(e.currentTarget.value)}
                                   /> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Telefono</label>
                                   <input className='my-2 px-2' type="number" disabled={isNewPaciente ? false : true}
                                        value={txtTelefono} onChange={e => setTxtTelefono(e.currentTarget.value)}
                                   /> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Fecha de Nacimiento</label>
                                   <input type="date" className='my-2 px-2' disabled={isNewPaciente ? false : true}
                                        value={txtFechaNac} onChange={e => setTxtFechaNac(e.currentTarget.value)}
                                        min="1920-01-01" max="2018-12-31" /> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Vacuna a Recibir</label>
                                   <select value={selectVacuna} onChange={(e) => setSelectVacuna(e.currentTarget.value)}>
                                        {state.vacunas.map(vacuna => (
                                             <option key={vacuna.id}>{vacuna.nombre}</option>
                                        ))}
                                   </select>
                              </div>
                              <label className={s['cursor-pointer']} style={{ width: '50%', margin: 10, color: 'blue' }}
                                   onClick={handleOpenModal}
                              >
                                   Anteriores vacunas
                              </label> <br />
                              <button className='my-2 p-2 btn btn-danger' style={{ color: 'white', margin: 10 }}
                                   onClick={cancelar}
                              > Cancelar</button>
                              <button className='my-2 p-2 btn btn-success' style={{ color: 'white' }}
                                   onClick={saveVacunado}
                              > Guardar Vacunado</button>
                         </div>
                    </form >
          }
     }
     const handleCloseModal = () => setShowModal(false)
     const handleOpenModal = () => setShowModal(true)

     useEffect(() => {
          getf()
     }, [txtCedula])

     async function getf() {
          const vacunados = await vacunadoServices.getVacunados({})
          const newVacunados = vacunados.filter(vacunado => (vacunado.paciente as Paciente).cedula == Number(txtCedula))
          setDataTableVacunasAnteriores(newVacunados)
     }

     return <div className='w-100'>
          <Modal centered show={showModal} onHide={handleCloseModal}>
               <Modal.Header >
                    <Modal.Title>Vacunas Anteriores de {txtNombre}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <table className="table table-striped">
                         <thead className="thead-dark">
                              <tr>
                                   <th scope="col">#</th>
                                   <th scope="col">Vacuna</th>
                                   <th scope="col">Provincia</th>
                                   <th scope="col">fecha Vacunacion</th>
                              </tr>
                         </thead>
                         <tbody>
                              {dataTableVacunasAnteriores.map((vacunado, index) => (
                                   <tr key={vacunado.id}>
                                        <th>{index + 1}</th>
                                        <tr>{(vacunado.vacuna as Vacuna).nombre}</tr>
                                        <td>{vacunado.vacuna?.provincia.nombre}</td>
                                        <td>{vacunado.fechaVacunacion}</td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </Modal.Body>
               <Modal.Footer>
                    <label
                         style={{ left: 20, position: 'absolute', fontWeight: 'bold' }}
                    >Dosis Aplicadas: {dataTableVacunasAnteriores.length}</label>
                    <Button variant="secondary" onClick={handleCloseModal}>
                         Close
                    </Button>
               </Modal.Footer>
          </Modal>
          {manageMarckoup()}
     </div>
}
import React, { useState } from 'react'
import s from './VacunadosForm.module.css'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../../types/storeTypes'
import vacunadoServices from '../../../services/vacunadoServices'
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

     function manageMarckoup() {

          async function handler() {
               setStateView(values.two)
               const res = await vacunadoServices.getVacunadoByCedula(Number(txtCedula))
               if (res) {
                    console.log(res)
                    setTxtNombre(res.paciente.nombre)
                    setTxtApellido(res.paciente.apellido)
                    setTxtTelefono(res.paciente.telefono)
                    setTxtFechaNac(res.paciente.fechaNacimiento)
                    setSelectVacuna(res.vacuna.nombre)

               }
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
                                   <input className='my-2 px-2' type="text"
                                        value={txtNombre} onChange={e => setTxtNombre(e.currentTarget.value)}
                                   /> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Apellido</label>
                                   <input className='my-2 px-2' type="text"
                                        value={txtApellido} onChange={e => setTxtApellido(e.currentTarget.value)}
                                   /> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Telefono</label>
                                   <input className='my-2 px-2' type="number"
                                        value={txtTelefono} onChange={e => setTxtTelefono(e.currentTarget.value)}
                                   /> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Fecha de Nacimiento</label>
                                   <input className='my-2 px-2' type="text"
                                        value={txtFechaNac} onChange={e => setTxtFechaNac(e.currentTarget.value)}
                                   /> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Vacuna a Recibir</label>
                                   <select value={selectVacuna} onChange={(e) => setSelectVacuna(e.currentTarget.value)}>
                                        {state.provincias.map(provincia => (
                                             <option key={provincia.id}>{provincia.nombre}</option>
                                        ))}
                                   </select>
                              </div>
                              <label className={s['cursor-pointer']} style={{ width: '50%', margin: 10, color: 'blue' }}
                                   onClick={handleOpenModal}
                              >
                                   Anteriores vacunas
                              </label> <br />
                              <button className='my-2 p-2 btn btn-danger' style={{ color: 'white', margin: 10 }}
                                   onClick={() => setStateView(values.one)}
                              > Cancelar</button>
                              <button className='my-2 p-2 btn btn-success' style={{ color: 'white' }}> Guardar Vacunado</button>
                         </div>
                    </form >
          }
     }
     const handleCloseModal = () => setShowModal(false)
     const handleOpenModal = () => setShowModal(true)
     return <div className='w-100'>
          <Modal centered show={showModal} onHide={handleCloseModal}>
               <Modal.Header >
                    <Modal.Title>Vacunas Anteriores de Juan</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod obcaecati quam doloremque asperiores? Aliquid repellat magni accusamus libero explicabo ab? Ut excepturi quos amet ipsa ex cum labore iusto deleniti!
               </Modal.Body>
               <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                         Close
                    </Button>
               </Modal.Footer>
          </Modal>
          {manageMarckoup()}
     </div>
}

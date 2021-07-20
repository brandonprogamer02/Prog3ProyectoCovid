import React, { useState } from 'react'
import s from './VacunadosForm.module.css'
import { Modal, Button } from 'react-bootstrap'
enum values {
     one,
     two
}

export default function VacunadoForm() {

     const [state, setState] = useState(values.two)
     const [showModal, setShowModal] = useState(false)
     function manageMarckoup() {
          switch (state) {
               case values.one:
                    return <form className={s['form-container-checkig-cedula']}>
                         <div>

                              <label className='my-2 h5'>Anadir Nuevo Vacunado</label>
                              <input className='my-2 px-3' type="text" /> <br />
                              <button className='my-2 p-2 btn btn-success' style={{ color: 'white' }}> Guardar Vacunado</button>
                         </div>
                    </form>
               case values.two:
                    return <form className={s['form-container-adding_data']}>
                         <div>
                              <div>
                                   <label className='my-2 '>Cedula</label>
                                   <label className='my-2 px-2'>201100544</label> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Nombre</label>
                                   <input className='my-2 px-2' type="text" /> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Apellido</label>
                                   <input className='my-2 px-2' type="text" /> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Telefono</label>
                                   <input className='my-2 px-2' type="number" /> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Fecha de Nacimiento</label>
                                   <input className='my-2 px-2' type="text" /> <br />
                              </div>
                              <div>
                                   <label className='my-2 '>Vacuna a Recibir</label>
                                   <select name="" id="">
                                        <option>Synovac</option>
                                        <option>Johnson</option>
                                   </select>
                              </div>
                              <label className={s['cursor-pointer']} style={{ width: '50%', margin: 10, color: 'blue' }}
                                   onClick={handleOpenModal}
                              >
                                   Anteriores vacunas
                              </label> <br />
                              <button className='my-2 p-2 btn btn-danger' style={{ color: 'white', margin: 10 }}> Cancelar</button>
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

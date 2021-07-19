import React from 'react'
import './ProvinciaView.css'

export default function ProvinciaView() {
     return (
          <div className='provincia-view-container'>
               <div className='provincia-view-add'>
                    <div >
                         <label className='my-2 h5'>Anadir Nueva Provincia</label>
                         <input className='my-2 px-3' type="text" /> <br />
                         <button className='my-2 p-2 btn btn-success' style={{ color: 'white' }}> Guardar Provincia</button>
                    </div>
               </div>
               <div className="provincia-view-table">
                    <table className="table table-striped">
                         <thead className="thead-dark">
                              <tr>
                                   <th scope="col">#</th>
                                   <th scope="col">First</th>
                                   <th scope="col">Last</th>
                                   <th scope="col">Handle</th>
                              </tr>
                         </thead>
                         <tbody>
                              <tr>
                                   <th scope="row">1</th>
                                   <td>Mark</td>
                                   <td>Otto</td>
                                   <td>@mdo</td>
                              </tr>
                              <tr>
                                   <th scope="row">2</th>
                                   <td>Jacob</td>
                                   <td>Thornton</td>
                                   <td>@fat</td>
                              </tr>
                              <tr>
                                   <th scope="row">3</th>
                                   <td>Larry</td>
                                   <td>the Bird</td>
                                   <td>@twitter</td>
                              </tr>
                         </tbody>
                    </table>
               </div>
          </div>
     )
}

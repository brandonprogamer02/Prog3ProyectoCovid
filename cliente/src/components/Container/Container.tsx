import React from 'react'
import CentralContainer from '../CentralContainer/CentralContainer'
import './container.css'

function Container() {


     return (
          <div className='container '>
               <div className="row w-100">
                    <div className="col-12 _container vh-100">
                         <h1 className=''>Tarea Covid Amadis Programacion 3</h1>
                         <CentralContainer />
                    </div>
               </div>
          </div>
     )
}

export default Container
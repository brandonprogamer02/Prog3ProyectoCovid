import React from 'react'
import CentralContainer from '../CentralContainer/CentralContainer'
import s from './Container.module.css'

function Container() {


     return (
          <div className='container-fluid '>
               <div className="row w-100">
                    <div className={`col-12 vh-100 ${s['_container']}`}>
                         <h1 className=''>Tarea Covid Amadis Programacion 3</h1>
                         <CentralContainer />
                    </div>
               </div>
          </div>
     )
}

export default Container
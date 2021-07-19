import React from 'react'
import ProvinciaView from '../ProvinciasView/ProvinciaView'
import VacunasView from '../VacunasView/VacunasView'
import './CentralContainer.css'
import { Switch, Route, Link, useLocation } from 'react-router-dom'

function CentralContainer() {
     const { pathname } = useLocation()

     return (
          <div className='central-container'>
               <div className="target-views">
                    <Link to='/vacunados'>
                         <label className={pathname == '/vacunados' ? 'seleccionado' : ''}>Vacunados</label>
                    </Link>
                    <Link to='/vacunas'>
                         <label className={pathname == '/vacunas' ? 'seleccionado' : ''}>Vacunas</label>
                    </Link>
                    <Link to='/provincias'>
                         <label className={pathname == '/provincias' ? 'seleccionado' : ''}>Provincias</label>
                    </Link>
               </div>
               <div className="contain-views">
                    <Switch>
                         <Route exact path='/'>
                              <VacunasView />
                         </Route>
                         <Route exact path='/vacunas'>
                              <VacunasView />
                         </Route>
                         <Route exact path='/provincias'>
                              <ProvinciaView />
                         </Route>
                    </Switch>
               </div>
          </div>
     )
}
export default CentralContainer
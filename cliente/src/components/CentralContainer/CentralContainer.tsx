import React, { useEffect, useState } from 'react'
import ProvinciaView from '../ProvinciasView/ProvinciaView'
import VacunasView from '../VacunasView/VacunasView'
import s from './CentralContainer.module.css'
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import VacunadosView from '../VacunadosView/VacunadosView'

function CentralContainer() {
     const { pathname } = useLocation()
     const [state, setState] = useState({
          isVacunadosThePath: '',
          isVacunasThePath: '',
          isProvinciasThePath: ''
     })
     useEffect(() => {
          let isVacunadosThePath = pathname == '/vacunados' ? s['seleccionado'] : pathname == '/' ? s['seleccionado'] : ''
          let isVacunasThePath = pathname == '/vacunas' ? s['seleccionado'] : ''
          let isProvinciasThePath = pathname == '/provincias' ? s['seleccionado'] : ''
          setState({ isVacunadosThePath, isVacunasThePath, isProvinciasThePath })

     }, [pathname])


     return (
          <div className={`${s['central-container']}`}>
               <div className={`${s['target-views']}`}>
                    <Link to='/vacunados'>
                         <label className={state.isVacunadosThePath}>Vacunados</label>
                    </Link>
                    <Link to='/vacunas'>
                         <label className={state.isVacunasThePath}>Vacunas</label>
                    </Link>
                    <Link to='/provincias'>
                         <label className={state.isProvinciasThePath}>Provincias</label>
                    </Link>
               </div>
               <div className={`${s['contain-views']}`}>
                    < Switch >
                         <Route exact path='/'>
                              <VacunadosView />
                         </Route>
                         <Route exact path='/vacunados'>
                              <VacunadosView />
                         </Route>
                         <Route exact path='/vacunas'>
                              <VacunasView />
                         </Route>
                         <Route exact path='/provincias'>
                              <ProvinciaView />
                         </Route>
                    </Switch>
               </div>
          </div >
     )
}
export default CentralContainer
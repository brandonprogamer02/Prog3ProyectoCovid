import React, { useEffect, useState } from 'react'
import ProvinciaView from '../ProvinciasView/ProvinciaView'
import VacunasView from '../VacunasView/VacunasView'
import s from './CentralContainer.module.css'
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import VacunadosView from '../VacunadosView/VacunadosView'
import ChartistGraph from 'react-chartist'
import { State } from '../../types/storeTypes'
import { useSelector } from 'react-redux'
import { Vacuna } from '../../types/VacunaTypes'

function CentralContainer() {
     const { pathname } = useLocation()
     const [state, setState] = useState({
          isVacunadosThePath: '',
          isVacunasThePath: '',
          isProvinciasThePath: '',
          isChartThePath: '',
          isAboutThePath: ''
     })
     useEffect(() => {
          let isVacunadosThePath = pathname == '/vacunados' ? s['seleccionado'] : pathname == '/' ? s['seleccionado'] : ''
          let isVacunasThePath = pathname == '/vacunas' ? s['seleccionado'] : ''
          let isProvinciasThePath = pathname == '/provincias' ? s['seleccionado'] : ''
          let isChartThePath = pathname == '/chart' ? s['seleccionado'] : ''
          let isAboutThePath = pathname == '/about' ? s['seleccionado'] : ''
          setState({ isVacunadosThePath, isVacunasThePath, isProvinciasThePath, isChartThePath, isAboutThePath })

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
                    <Link to='/chart'>
                         <label className={state.isChartThePath}>Chart</label>
                    </Link>
                    <Link to='/about'>
                         <label className={state.isAboutThePath}>Acerca de</label>
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
                         <Route exact path='/chart'>
                              <F />
                         </Route>
                         <Route exact path='/about'>
                              <About />
                         </Route>
                    </Switch>
               </div>
          </div >
     )
}
function F() {
     const state = useSelector((state: State) => state)
     const [result, setResult] = useState<any>(null);
     // let vacunas
     useEffect(() => {
          if (result == null && state.vacunados.length != 0) {
               let labels: any = []
               let series: any = []
               state.vacunas.forEach(vacuna => {
                    let count = 0
                    state.vacunados.forEach(vacunado => {
                         if ((vacunado.vacuna as Vacuna).id == vacuna.id) {
                              count++
                         }
                    })
                    labels.push(vacuna.nombre)
                    series.push(count)
               })
               const data = {
                    labels,
                    series: [
                         series
                    ]
               }
               labels.length > 0 && setResult(data)
          }
     }, [state.vacunas, state.vacunados])

     return (
          <div style={{ height: '100%' }}>
               <h5>Chart Vacunas</h5>
               <ChartistGraph data={result} type={'Bar'} style={{ height: '100%' }} />
          </div>
     )
}

function About() {

     return (
          <div>
               <h5>PROGRAMACION 3 CON AMADIS</h5> <br />
               <p>
                    <strong>[BRANDOX] Brandon Fernandez Mejia: </strong>hizo el frontend completo(react,redux,typescript,bootstrap) y la base de datos
               </p>
               <p>
                    <strong>Jefferson Payano</strong>: hizo el backend (api con asp net core) junto con diogenes
               </p>
               <p>
                    <strong>Diogenes Ulloa</strong>: ayudo a hacer el backend y la base de datos
               </p>
          </div>
     )
}
export default CentralContainer
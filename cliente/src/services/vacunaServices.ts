import axios, { AxiosResponse } from 'axios';
import baseAxios from '../baseAxios'
import { ApiResponse } from '../types/generalTypes';
import { Provincia } from '../types/ProvinciaTypes';
import { Vacuna } from '../types/VacunaTypes';


async function insertVacuna(vacuna: Vacuna): Promise<Vacuna> {
     const body = { nombre: vacuna.nombre, provinciaId: vacuna.provincia.id }

     let response: AxiosResponse<Vacuna> = await baseAxios.post('/Vacunas', body)
     let data: Vacuna = response.data
     return data
}

async function getVacunas(): Promise<Vacuna[]> {
     let response: AxiosResponse<Vacuna[]> = await baseAxios.get('/Vacunas')
     let data: Vacuna[] = response.data
     return data
}

async function deleteVacuna(provinciaId: number) {
     await baseAxios.delete('/Vacunas/' + provinciaId)
}


async function updateVacuna(provincia: Provincia) {
     try {

          await baseAxios.put(`/Vacunas/${provincia.id}`, provincia)
     } catch (error) {
          console.log(error)
     }
}

const provinciaServices = {
     insertVacuna,
     getVacunas,
     deleteVacuna,
     updateVacuna
}

export default provinciaServices

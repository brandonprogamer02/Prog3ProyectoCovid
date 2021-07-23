import axios, { AxiosResponse } from 'axios';
import baseAxios from '../baseAxios'
import { ApiResponse } from '../types/generalTypes';
import { Provincia } from '../types/ProvinciaTypes';

async function insertProvincia(provincia: Provincia): Promise<Provincia> {
     const body = {
          "nombre": provincia.nombre
     }

     let response: AxiosResponse<Provincia> = await baseAxios.post('/Provincias', body)
     let data: Provincia = response.data
     return data
}

async function getProvincias(): Promise<Provincia[]> {

     let response: AxiosResponse<ApiResponse<Provincia>> = await baseAxios.get('/Provincias')

     let data: Provincia[] = response.data.ls
     return data
}

async function deleteProvincia(provinciaId: number) {
     await baseAxios.delete('/Provincias/' + provinciaId)
}


async function updateProvincia(provincia: Provincia) {
     try {

          await baseAxios.put(`/Provincias/${provincia.id}`, provincia)
     } catch (error) {
          console.log(error)
     }
}

const provinciaServices = {
     insertProvincia,
     getProvincias,
     deleteProvincia,
     updateProvincia
}

export default provinciaServices

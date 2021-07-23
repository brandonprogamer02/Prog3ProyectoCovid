import axios, { AxiosResponse } from 'axios';
import baseAxios from '../baseAxios'
import { ApiResponse } from '../types/generalTypes';
import { Provincia } from '../types/ProvinciaTypes';
import { Paciente, Vacunado } from '../types/VacunadoTypes';


async function insertVacunado({ pacienteId, vacunaId, fechaVacunacion }: Vacunado): Promise<Vacunado> {
     const body = { pacienteId, vacunaId, fechaVacunacion }

     let response: AxiosResponse<Vacunado> = await baseAxios.post('/Vacunadoes', body)
     let data: Vacunado = response.data
     return data
}

async function insertPaciente(paciente: Paciente): Promise<Paciente> {
     const body = paciente
     let response: AxiosResponse<Paciente> = await baseAxios.post('/Pacientes', body)
     let data: Paciente = response.data
     return data
}

type Param = {
     provincia?: string,
     vacuna?: string,
     signoZodiacal?: string,
     nombrePaciente?: string
}

async function getVacunados(param: Param): Promise<Vacunado[]> {
     let url = '/Vacunadoes/VacunadoGetAll'
     if (param.provincia) {
          url = '/Vacunadoes/GetVacunadosPro/' + param.provincia
     } else if (param.vacuna) {
          url = '/Vacunadoes/GetVacunadosMarca/' + param.vacuna
     } else if (param.nombrePaciente) {
          try {
               const data = await getVacunadoByNombrePaciente(param.nombrePaciente)
               return [data]
          } catch (error) {
               return []
          }
     }
     try {
          let response: AxiosResponse<ApiResponse<Vacunado[]>> = await baseAxios.get(url)
          let data: Vacunado[] = response.data.ls
          return data

     } catch (error) {
          return []
     }

}

async function getVacunadoByCedula(cedula: number): Promise<Vacunado> {
     let response: AxiosResponse<ApiResponse<Vacunado[]>> = await baseAxios.get('/Vacunadoes/GetVacunadosCedu/' + cedula)
     let data: Vacunado[] = response.data.ls
     return data[0]
}

async function getVacunadoByNombrePaciente(nombrePaciente: string): Promise<Vacunado> {
     let response: AxiosResponse<ApiResponse<Vacunado>> = await baseAxios.get('/Vacunadoes/ConsultaVacunados/' + nombrePaciente)
     let data: Vacunado = response.data.ls
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
     insertVacunado,
     getVacunados,
     deleteVacuna,
     updateVacuna,
     getVacunadoByCedula,
     insertPaciente
}

export default provinciaServices

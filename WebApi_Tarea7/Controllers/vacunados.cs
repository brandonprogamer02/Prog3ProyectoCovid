using Dapper;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApi_Tarea7.Models;
using WebApi_Tarea7.Models.ResponseApi;

namespace WebApi_Tarea7.Controllers
{
    [Route("api")]
    [ApiController]
    public class vacunados : ControllerBase
    {

        Response Respuesta = new Response();
        private string Conexion = @"Server=localhost; uid=root; pwd=mysql; Database=tareacovid";

        [HttpGet("vacunado")]
        public IActionResult GetVa()
        {
            try
            {

                IEnumerable<Models.vacunados> lista = null;

                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "select id,paciente_id,vacuna_id,fecha_vacunacion from vacunados";

                    lista = db.Query<Models.vacunados>(sql);

                    Respuesta.ls = lista;
                }
            }
            catch (Exception ex)
            {


                Respuesta.mensaje = ex.Message;
            }


            return Ok(Respuesta);
        }

        [HttpGet("ConsultaVacunados")]

        public IActionResult GetConsultaVacunados()
        {
            try
            {

                IEnumerable<Models.vacunados> lista = null;



                using (var db = new MySqlConnection(Conexion))
                {
                    var diccionario = new Dictionary<int, Models.vacunados>();

                    var sql = $" SELECT * FROM vacunados AS v " +
                        $" INNER JOIN pacientes AS p ON v.paciente_id = p.id ";

                    lista = db.Query<Models.vacunados, Models.pacientes, Models.vacunados>(sql,
                        (vacunado, paciente) =>
                        {
                            Models.vacunados vacunadosTemp;

                            if (!diccionario.TryGetValue(vacunado.id, out vacunadosTemp))
                            {
                                vacunadosTemp = vacunado;
                                vacunadosTemp.pacientes = new List<pacientes>();

                                diccionario.Add(vacunadosTemp.id, vacunado);

                            }

                            if (paciente != null)
                            {
                                vacunadosTemp.pacientes.Add(paciente);
                            }

                            return vacunadosTemp;
                        }).Distinct().ToList();


                    Respuesta.ls = lista;

                  

                }
            }
            catch (Exception ex)
            {


                Respuesta.mensaje = ex.Message;
            }



            return Ok(Respuesta);


        }

        [HttpGet("GetVacunadosMarca")]

        public IActionResult GetVacunadosMarca()
        {
            try
            {
                var diccionario = new Dictionary<int, Models.vacunados>();

                IEnumerable<Models.vacunados> lista = null;

                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = " SELECT p.nombre AS 'Personas', va.nombre AS 'Marca_Vacuna', v.id,v.vacuna_id, v.fecha_vacunacion FROM vacunados AS v " +
                        " INNER JOIN pacientes AS p ON v.paciente_id = p.id " +
                        " INNER JOIN vacunas AS va ON va.id = v.vacuna_id ";

                    lista = db.Query<Models.vacunados,Models.vacunas, Models.pacientes, Models.vacunados>(sql,
                        (vacunado,vacuna,paciente) => 
                        {
                            Models.vacunados vacunadosTemp;

                            if (!diccionario.TryGetValue(vacunado.id, out vacunadosTemp))
                            {
                                vacunadosTemp = vacunado;

                                vacunadosTemp.vacunas = new List<Models.vacunas>();

                                vacunadosTemp.pacientes = new List<pacientes>();

                                diccionario.Add(vacunadosTemp.id, vacunado);

                                
                               

                            }

                            if (vacuna != null)
                            {
                                vacunadosTemp.vacunas.Add(vacuna);
                            }

                            if (paciente != null)
                            {
                                vacunadosTemp.pacientes.Add(paciente);
                            }

                            return vacunadosTemp;

                        }, splitOn: "vacuna_id,paciente_id").Distinct().ToList();

                    Respuesta.ls = lista;
                }
            }
            catch (Exception ex)
            {


                Respuesta.mensaje = ex.Message;
            }


            return Ok(Respuesta);



        }

        [HttpPost]

        public IActionResult InsertVa(Models.vacunados pacientes)
        {

            try
            {
                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "INSERT INTO vacunados(paciente_id,vacuna_id,fecha_vacunacion) " +
                        "VALUES(@paciente_id,@vacuna_id,@fecha_vacunacion)";

                    Respuesta.exito = db.Execute(sql, pacientes);
                    Respuesta.mensaje = " 201 CREATED ";

                }


            }
            catch (Exception ex)
            {

                Respuesta.mensaje = "Error: 415 UNSUPPORTED MEDIA TYPE >> " + ex.Message;

            }

            return Ok(Respuesta.mensaje + Respuesta.exito);



        }

        [HttpPut]

        public IActionResult EditVA(Models.vacunados pacientes)
        {

            try
            {
                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "UPDATE vacunados SET paciente_id=@paciente_id, vacuna_id=@vacuna_id, fecha_vacunacion=@fecha_vacunacion " +
                        " WHERE id=@id";

                    Respuesta.exito = db.Execute(sql, pacientes);
                    Respuesta.mensaje = " 201 CREATED ";
                }

            }
            catch (Exception ex)
            {

                Respuesta.mensaje = "Error: 415 UNSUPPORTED MEDIA TYPE >> " + ex.Message;

            }

            return Ok(Respuesta.mensaje + Respuesta.exito);


        }

        [HttpDelete]
        public IActionResult DeleteVa(Models.vacunados pacientes)
        {
            try
            {
                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "delete from vacunados where id=@id";

                    Respuesta.exito = db.Execute(sql, pacientes);
                    Respuesta.mensaje = " 201 CREATED ";

                }
            }
            catch (Exception ex)
            {

                Respuesta.mensaje = "Error: 415 UNSUPPORTED MEDIA TYPE >> " + ex.Message;

            }

            return Ok(Respuesta.mensaje + Respuesta.exito);



        }

    }
}

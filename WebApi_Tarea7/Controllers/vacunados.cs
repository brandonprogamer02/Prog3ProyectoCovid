using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_Tarea7.Models.ResponseApi;

namespace WebApi_Tarea7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class vacunados : ControllerBase
    {

        Response Respuesta = new Response();
        private string Conexion = @"Server=localhost; uid=root; pwd=mysql; Database=tareacovid";

        [HttpGet]

        public IActionResult Get()
        {
            try
            {
                
                IEnumerable<Models.pacientes> lista = null;

                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "select id,paciente_id,vacuna_id,fecha_vacunacion from vacunados";

                    lista = db.Query<Models.pacientes>(sql);

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

        public IActionResult Insert(Models.pacientes pacientes)
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

        public IActionResult Edit(Models.pacientes pacientes)
        {

            try
            {
                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "UPDATE pacientes SET paciente_id=@paciente_id, vacuna_id=@vacuna_id, fecha_vacunacion=@fecha_vacunacion " +
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
        public IActionResult Delete(Models.pacientes pacientes)
        {
            try
            {
                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "delete from pacientes where id=@id";

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

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
    [Route("api")]
    [ApiController]
    public class Provincia:ControllerBase
    {
        Response Respuesta = new Response();
        private string Conexion = @"Server=localhost; uid=root; pwd=mysql; Database=tareacovid";

        [HttpGet("GetProvinciaByID")]
        public IActionResult GetProvinciaByID()
        {
            try
            {
                IEnumerable<Models.provincia> lista = null;

                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "select provincias.nombre,vacunas.nombre,vacunados.fecha_vacunacion,pacientes.cedula,pacientes.nombre,pacientes.apellido,pacientes.telefono from(((provincias inner join vacunas on provincia_id = provincias.id) inner join vacunados on vacunas.id = vacunas.id) inner join pacientes on paciente_id = pacientes.id)";

                    lista = db.Query<Models.provincia>(sql);

                    Respuesta.ls = lista;
                }
            }
            catch (Exception ex)
            {

                Respuesta.mensaje = ex.Message;
            }

            return Ok(Respuesta);

        }

        [HttpGet("GetProvincias")]
        public IActionResult Get()
        {
            try
            {
                IEnumerable<Models.provincia> lista = null;

                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "select * from provincias)";

                    lista = db.Query<Models.provincia>(sql);

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

        public IActionResult Insert(Models.provincia provincia)
        {

            try
            {
                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "insert into provincias(nombre)" +
                        "values(@nombre)";

                    Respuesta.exito = db.Execute(sql, provincia);
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
                    var sql = "UPDATE pacientes SET cedula=@cedula, nombre=@nombre, apellido=@apellido,telefono=@telefono,fecha_nacimiento=@fecha_nacimiento" +
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
        public IActionResult Delete(Models.provincia provincia)
        {
            try
            {
                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "delete from provincia where id=@id";

                    Respuesta.exito = db.Execute(sql, provincia);
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

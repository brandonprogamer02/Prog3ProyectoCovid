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
    public class vacunas : ControllerBase
    {
        Response RespuestaV = new Response();
        private string Conexion = @"Server=localhost; uid=root; pwd=mysql; Database=tareacovid";

        [HttpGet]
        public IActionResult GetV()
        {
            try
            {

                IEnumerable<Models.vacunas> lista = null;

                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "select id,nombre,provincia_id from vacunas";

                    lista = db.Query<Models.vacunas>(sql);

                    RespuestaV.ls = lista;
                }
            }
            catch (Exception ex)
            {

                RespuestaV.mensaje = ex.Message;
            }


            return Ok(RespuestaV);
        }

        [HttpPost]

        public IActionResult InsertV(Models.vacunas pacientes)
        {

            try
            {
                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "INSERT INTO vacunas(nombre,provincia_id) " +
                        " VALUES(@nombre,@provincia_id)";

                    RespuestaV.exito = db.Execute(sql, pacientes);
                    RespuestaV.mensaje = " 201 CREATED ";

                }


            }
            catch (Exception ex)
            {

                RespuestaV.mensaje = "Error: 415 UNSUPPORTED MEDIA TYPE >> " + ex.Message;

            }

            return Ok(RespuestaV.mensaje + RespuestaV.exito);






        }

        [HttpPut]

        public IActionResult EditV(Models.vacunas pacientes)
        {

            try
            {
                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "UPDATE vacunas SET nombre=@nombre, provincia_id=@provincia_id " +
                        " WHERE id=@id";

                    RespuestaV.exito = db.Execute(sql, pacientes);
                    RespuestaV.mensaje = " 201 CREATED ";
                }

            }
            catch (Exception ex)
            {

                RespuestaV.mensaje = "Error: 415 UNSUPPORTED MEDIA TYPE >> " + ex.Message;

            }

            return Ok(RespuestaV.mensaje + RespuestaV.exito);


        }

        [HttpDelete]
        public IActionResult DeleteV(Models.vacunas pacientes)
        {
            try
            {
                using (var db = new MySqlConnection(Conexion))
                {
                    var sql = "delete from vacunas where id=@id";

                    RespuestaV.exito = db.Execute(sql, pacientes);
                    RespuestaV.mensaje = " 201 CREATED ";

                }
            }
            catch (Exception ex)
            {

                RespuestaV.mensaje = "Error: 415 UNSUPPORTED MEDIA TYPE >> " + ex.Message;

            }

            return Ok(RespuestaV.mensaje + RespuestaV.exito);



        }
    }
}

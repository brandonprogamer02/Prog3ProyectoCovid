using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi_Tarea7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatosCovid : ControllerBase
    {

        private string Conexion = @"Server=localhost; uid=root; pwd=mysql; Database=tareacovid";

        [HttpGet]

        public IActionResult Get()
        {
            IEnumerable<Models.pacientes> lista = null;

            using(var db = new MySqlConnection(Conexion))
            {
                var sql = "select id,cedula,nombre,apellido,telefono,fecha_nacimiento from pacientes";

                lista = db.Query<Models.pacientes>(sql);
            }

            return Ok(lista);
        }

        [HttpPost]

        public IActionResult Insert(Models.pacientes pacientes)
        {
            int result = 0;

            using(var db = new MySqlConnection(Conexion))
            {
                var sql = "insert into pacientes(cedula,nombre,apellido,telefono,fecha_nacimiento)" +
                    "values(@cedula,@nombre,@apellido,@telefono,@fecha_nacimiento)";

                result = db.Execute(sql, pacientes);
            }

            if(result == 1)
            {
                return Ok("201 CREATED " + result);
            }
            else
            {
                return Ok("Error: 415 UNSUPPORTED MEDIA TYPE " + result);
            }
        }

        [HttpPut]

        public IActionResult Edit(Models.pacientes pacientes)
        {
            int result = 0;

            using (var db = new MySqlConnection(Conexion))
            {
                var sql = "UPDATE pacientes SET cedula=@cedula, nombre=@nombre, apellido=@apellido,telefono=@telefono,fecha_nacimiento=@fecha_nacimiento" +
                    " WHERE id=@id";

                result = db.Execute(sql, pacientes);
            }

            if (result == 1)
            {
                return Ok("201 CREATED " + result);
            }
            else
            {
                return Ok("Error: 415 UNSUPPORTED MEDIA TYPE " + result);
            }
        }

        [HttpDelete]
        public IActionResult Delete(Models.pacientes pacientes)
        {
            int result = 0;
            using(var db = new MySqlConnection(Conexion))
            {
                var sql = "delete from pacientes where id=@id";

                result = db.Execute(sql, pacientes);
                
            }

            if (result == 1)
            {
                return Ok("201 CREATED " + result);
            }
            else
            {
                return Ok("Error: 415 UNSUPPORTED MEDIA TYPE " + result);
            }
        }

    }
}

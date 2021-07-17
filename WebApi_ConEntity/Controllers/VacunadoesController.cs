using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_ConEntity.Models;
using WebApi_ConEntity.Models.Response;

namespace WebApi_ConEntity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacunadoesController : ControllerBase
    {
        private readonly tareacovidContext _context;



        public VacunadoesController(tareacovidContext context)
        {
            _context = context;
           
        }

        // GET: api/Vacunadoes
        [HttpGet("VacunadoGet")]
        public async Task<IActionResult> GetVacunados()
        {

            Response respuesta = new Response();
            IEnumerable<Vacunado> lista = null;

            try
            {
               

                lista = await _context.Vacunados.ToListAsync();
                respuesta.ls = lista;
            }
            catch (Exception ex)
            {

                respuesta.mensaje = ex.Message;
            }
            

            return Ok(respuesta);

           
        }

        // GET: api/Vacunadoes/5
        [HttpGet("ConsultaPorID/{id}")]
        public async Task<IActionResult> GetVacunado(int id)
        {
            Response respuesta = new Response();
            Vacunado lista = null;

            try
            {
                lista = await _context.Vacunados.FindAsync(id);

                respuesta.ls = lista;

                if (lista == null)
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {

                respuesta.mensaje = ex.Message;
            }
           

            return Ok(respuesta);
        }

        // GET: api/Vacunadoes/5

        [HttpGet("ConsultaVacunados/{nombre}")]
        public async Task<IActionResult> GetConsultaVacunados([FromRoute] string nombre)
        {
            Response respuesta = new Response();

           

            try
            {
                var listado = await _context.Vacunados.Include(x=> x.Paciente).FirstOrDefaultAsync(x=> x.Paciente.Nombre == nombre);
                               
                if (listado == null)
                {
                    return NotFound();
                }

                respuesta.ls = listado;

            }
            catch (Exception ex )
            {
                respuesta.mensaje = ex.Message;

            }

           

            return Ok(respuesta);
        }


        [HttpGet("GetVacunadosMarca/{marca}")]
        public async Task<IActionResult> GetVacunadosMarca([FromRoute] string marca)
        {
            Response respuesta = new Response();

    
            try
            {
                var listado = await _context.Vacunados.Include(x => x.Paciente).Include(v=>v.Vacuna).Where(m=> m.Vacuna.Nombre == marca ).ToArrayAsync();

                if (listado == null)
                {
                    return NotFound();
                }

                respuesta.ls = listado;

            }
            catch (Exception ex)
            {
                respuesta.mensaje = ex.Message;

            }



            return Ok(respuesta);
        }



        // PUT: api/Vacunadoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVacunado(int id, Vacunado vacunado)
        {
            if (id != vacunado.Id)
            {
                return BadRequest();
            }

            _context.Entry(vacunado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacunadoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Vacunadoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Vacunado>> PostVacunado(Vacunado vacunado)
        {

            _context.Vacunados.Add(vacunado);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVacunado", new { id = vacunado.Id }, vacunado);



            //var existeCedula = await _context.Pacientes.AnyAsync(x => x.Cedula == vacunado.Paciente.Cedula);


            //if (existeCedula)
            //{
            //    _context.Vacunados.Add(vacunado);
            //    await _context.SaveChangesAsync();

            //    return CreatedAtAction("GetVacunado", new { id = vacunado.Id }, vacunado);
            //}
            //else
            //{
            //    return BadRequest(" Esta Cedula no existe en nuestra Base de datos ");
            //}


        }

        // DELETE: api/Vacunadoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVacunado(int id)
        {
            var vacunado = await _context.Vacunados.FindAsync(id);
            if (vacunado == null)
            {
                return NotFound();
            }

            _context.Vacunados.Remove(vacunado);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VacunadoExists(int id)
        {
            return _context.Vacunados.Any(e => e.Id == id);
        }
    }
}

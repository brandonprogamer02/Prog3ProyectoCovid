using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_ConEntity.Models;
using WebApi_ConEntity.Models.Response;

namespace WebApi_ConEntity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvinciasController : ControllerBase
    {
        private readonly tareacovidContext _context;

        public ProvinciasController(tareacovidContext context)
        {
            _context = context;
        }

        // GET: api/Provincias
        [HttpGet]
        public async Task<IActionResult> GetProvincias()
        {
            Response respuesta = new Response();
            IEnumerable<Provincia> lista = null;

            try
            {


                lista = await _context.Provincias.ToListAsync();
                respuesta.ls = lista;
            }
            catch (Exception ex)
            {

                respuesta.mensaje = ex.Message;
            }


            return Ok(respuesta);
        }

        // GET: api/Provincias/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProvincia(int id)
        {
            Response respuesta = new Response();
            Provincia lista = null;
            try
            {
                lista = await _context.Provincias.FindAsync(id);

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

        [HttpGet("GetVacunadosProvincia")]
        public async Task<IActionResult> GetVacunadosProvincia()
        {
            Response respuesta = new Response();
           

            try
            {


                var listado = await _context.Vacunados.Include(x => x.Paciente).Include(v => v.Vacuna.Provincia).ToArrayAsync();
                respuesta.ls = listado;
            }
            catch (Exception ex)
            {

                respuesta.mensaje = ex.Message;
            }


            return Ok(respuesta);
        }

        // PUT: api/Provincias/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProvincia(int id, Provincia provincia)
        {
            if (id != provincia.Id)
            {
                return BadRequest();
            }

            _context.Entry(provincia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProvinciaExists(id))
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

        // POST: api/Provincias
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Provincia>> PostProvincia(Provincia provincia)
        {
            _context.Provincias.Add(provincia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProvincia", new { id = provincia.Id }, provincia);
        }

        // DELETE: api/Provincias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProvincia(int id)
        {
            var provincia = await _context.Provincias.FindAsync(id);
            if (provincia == null)
            {
                return NotFound();
            }

            _context.Provincias.Remove(provincia);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProvinciaExists(int id)
        {
            return _context.Provincias.Any(e => e.Id == id);
        }
    }
}

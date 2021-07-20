using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_ConEntity.Models;

namespace WebApi_ConEntity.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvinciaVacunasController :ControllerBase
    {
        private readonly tareacovidContext _context;

        public ProvinciaVacunasController(tareacovidContext context)
        {
            _context = context;
        }

        // GET: api/ProvinciaVacunas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProvinciaVacuna>>> GetProvinciaVacunas()
        {
            return await _context.ProvinciaVacunas.ToListAsync();
        }

        // GET: api/Vacunas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProvinciaVacuna>> GetProvinciaVacunas(int id)
        {
            var provinciaVacuna = await _context.ProvinciaVacunas.FindAsync(id);

            if (provinciaVacuna == null)
            {
                return NotFound();
            }

            return provinciaVacuna;
        }

        // PUT: api/Vacunas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProvinciaVacuna(int id, ProvinciaVacuna provinciaVacuna)
        {
            if (id != provinciaVacuna.Id)
            {
                return BadRequest();
            }

            _context.Entry(provinciaVacuna).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProvinciaVacunaExists(id))
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

        // POST: api/Vacunas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Vacuna>> PostProvinciaVacuna(ProvinciaVacuna provinciaVacuna)
        {
            _context.ProvinciaVacunas.Add(provinciaVacuna);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProvinciaVacuna", new { id = provinciaVacuna.Id }, provinciaVacuna);
        }

        // DELETE: api/Vacunas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProvinciaVacuna(int id)
        {
            var provinciaVacuna = await _context.ProvinciaVacunas.FindAsync(id);
            if (provinciaVacuna == null)
            {
                return NotFound();
            }

            _context.ProvinciaVacunas.Remove(provinciaVacuna);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProvinciaVacunaExists(int id)
        {
            return _context.ProvinciaVacunas.Any(e => e.Id == id);
        }
    }
}

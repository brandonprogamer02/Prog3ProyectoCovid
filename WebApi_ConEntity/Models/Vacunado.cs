using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi_ConEntity.Models
{
    public partial class Vacunado
    {
        public int Id { get; set; }
        public int PacienteId { get; set; }
        public int VacunaId { get; set; }
        public DateTime FechaVacunacion { get; set; }

        public virtual Paciente Paciente { get; set; }
        public virtual Vacuna Vacuna { get; set; }
    }
}

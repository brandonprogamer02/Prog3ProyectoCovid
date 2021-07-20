using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi_ConEntity.Models
{
    public partial class ProvinciaVacuna
    {
        public int Id { get; set; }
        public int ProvinciaId { get; set; }
        public int VacunaId { get; set; }

        public virtual Provincia Provincia { get; set; }
        public virtual Vacuna Vacuna { get; set; }
    }
}

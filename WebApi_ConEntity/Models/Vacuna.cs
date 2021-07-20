using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi_ConEntity.Models
{
    public partial class Vacuna
    {
        public Vacuna()
        {
            ProvinciaVacunas = new HashSet<ProvinciaVacuna>();
            Vacunados = new HashSet<Vacunado>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<ProvinciaVacuna> ProvinciaVacunas { get; set; }
        public virtual ICollection<Vacunado> Vacunados { get; set; }
    }
}

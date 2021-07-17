using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi_ConEntity.Models
{
    public partial class Vacuna
    {
        public Vacuna()
        {
            Vacunados = new HashSet<Vacunado>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public int ProvinciaId { get; set; }

        public virtual Provincia Provincia { get; set; }
        public virtual ICollection<Vacunado> Vacunados { get; set; }
    }
}

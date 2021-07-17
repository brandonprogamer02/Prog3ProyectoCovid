using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi_ConEntity.Models
{
    public partial class Provincia
    {
        public Provincia()
        {
            Vacunas = new HashSet<Vacuna>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Vacuna> Vacunas { get; set; }
    }
}

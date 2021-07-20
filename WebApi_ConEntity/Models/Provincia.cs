using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi_ConEntity.Models
{
    public partial class Provincia
    {
        public Provincia()
        {
            ProvinciaVacunas = new HashSet<ProvinciaVacuna>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<ProvinciaVacuna> ProvinciaVacunas { get; set; }
    }
}

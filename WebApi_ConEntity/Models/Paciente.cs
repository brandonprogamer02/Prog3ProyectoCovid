using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi_ConEntity.Models
{
    public partial class Paciente
    {
        public Paciente()
        {
            Vacunados = new HashSet<Vacunado>();
        }

        public int Id { get; set; }
        public int Cedula { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Telefono { get; set; }
        public DateTime FechaNacimiento { get; set; }

        public virtual ICollection<Vacunado> Vacunados { get; set; }
    }
}

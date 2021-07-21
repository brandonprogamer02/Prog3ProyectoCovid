using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

        [Required(ErrorMessage ="La Cedula es obligatoria! ")]
        public int Cedula { get; set; }


        [Required(ErrorMessage = "El Nombre es obligatorio! ")]
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Telefono { get; set; }
        public DateTime FechaNacimiento { get; set; }

        public virtual ICollection<Vacunado> Vacunados { get; set; }
    }
}
